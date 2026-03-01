import { Injectable, Logger } from '@nestjs/common';
import {
  CircuitBreakerOptions,
  CircuitBreakerState,
  CircuitBreakerStateEnum,
} from './circuit-breaker.interface';

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger('CircuitBreakerService');
  private readonly circuits = new Map<string, CircuitBreakerState>();
  private readonly defaultOptions: CircuitBreakerOptions = {
    failureThreshold: 5,
    timeout: 6000, // 6 seconds
    resetTimeout: 30000, // 30 seconds
  };

  private getOrCreateCircuit(
    key: string,
    options: CircuitBreakerOptions,
  ): CircuitBreakerState {
    if (!this.circuits.has(key)) {
      this.circuits.set(key, {
        state: CircuitBreakerStateEnum.CLOSED,
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: Date.now() + options.timeout,
      });
    }

    return this.circuits.get(key)!;
  }

  private onSuccess(circuit: CircuitBreakerState, key: string): void {
    circuit.failureCount = 0;
    circuit.state = CircuitBreakerStateEnum.CLOSED;
    this.logger.log(
      `Circuit breaker success for key: ${key}, resetting state to CLOSED`,
    );
  }

  private onFailure(
    circuit: CircuitBreakerState,
    key: string,
    options: CircuitBreakerOptions,
  ): void {
    circuit.failureCount++;
    circuit.lastFailureTime = Date.now();

    if (circuit.failureCount >= options.failureThreshold) {
      circuit.state = CircuitBreakerStateEnum.OPEN;
      circuit.nextAttemptTime = Date.now() + options.resetTimeout;
      this.logger.warn(
        `Circuit breaker OPEN for key: ${key} after ${circuit.failureCount} failures`,
      );
    }
  }

  async executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    key: string,
    fallback?: () => Promise<T>,
    options: CircuitBreakerOptions = this.defaultOptions,
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };

    // recupera o estado atual do circuit breaker
    const circuit = this.getOrCreateCircuit(key, config);

    if (circuit.state === CircuitBreakerStateEnum.OPEN) {
      if (Date.now() < circuit.nextAttemptTime) {
        this.logger.warn(
          `Circuit breaker is OPEN for key: ${key}, using fallback`,
        );
        if (fallback) {
          return fallback();
        }

        throw new Error('Circuit breaker OPEN');
      } else {
        circuit.state = CircuitBreakerStateEnum.HALF_OPEN;
        this.logger.warn(
          `Circuit breaker is HALF_OPEN for key: ${key}, using fallback`,
        );
      }
    }

    try {
      const result = await operation();
      this.onSuccess(circuit, key);

      return result;
    } catch (error) {
      this.onFailure(circuit, key, config);
      this.logger.error(
        `Circuit breaker failure for key: ${key}:`,
        error.message,
      );

      if (fallback) {
        this.logger.log(`Using fallback for key: ${key}`);
        return await fallback();
      }
      throw error;
    }
  }

  getCircuitState(key: string): CircuitBreakerState | undefined {
    return this.circuits.get(key);
  }

  getAllCircuits(): Map<string, CircuitBreakerState> {
    return new Map(this.circuits);
  }

  resetCircuit(key: string): void {
    this.circuits.delete(key);
    this.logger.log(`Circuit breaker reset for key: ${key}`);
  }
}

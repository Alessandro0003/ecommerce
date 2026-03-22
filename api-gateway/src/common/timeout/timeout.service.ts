import { Injectable, Logger } from '@nestjs/common';
import { TimeoutOptions } from './timeout.interface';

@Injectable()
export class TimeoutService {
  private readonly logger = new Logger(TimeoutService.name);

  private readonly defaultOptions: TimeoutOptions = {
    timeout: 5000, // 5 seconds
    retries: 3,
    backoffMultiplier: 2,
    maxBackoff: 30000, // 30 seconds
  };

  async executeWithTimeout<T>(
    operation: () => Promise<T>,
    options: Partial<TimeoutOptions> = {},
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };

    return this.executeWithRetry(operation, config);
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    options: TimeoutOptions,
  ): Promise<T> {
    let lastError: Error;
    let delay = 1000; // Inicio de 1 segundo

    for (let attemp = 0; attemp <= options.retries; attemp++) {
      try {
        this.logger.debug(`Attemp ${attemp + 1}/${options.retries + 1}`);

        const result = await Promise.race([
          operation(),
          this.createTimeoutPromise(options.timeout),
        ]);

        if (attemp > 0) {
          this.logger.debug(`Operation succeded on attempt ${attemp + 1}`);
        }

        return result as T;
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(`Attempt ${attemp + 1} failed: ${lastError.message}`);

        if (attemp < options.retries) {
          await this.delay(delay);
          delay = Math.min(
            delay * options.backoffMultiplier,
            options.maxBackoff,
          );
        }
      }
    }

    this.logger.error(`All ${options.retries + 1} attempts failed`);
    throw lastError!;
  }

  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeout} ms`));
      }, timeout);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async executeWithCustomTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
  ): Promise<T> {
    return Promise.race([operation(), this.createTimeoutPromise(timeoutMs)]);
  }
}

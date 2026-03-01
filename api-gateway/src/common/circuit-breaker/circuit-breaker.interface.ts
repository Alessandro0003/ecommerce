export enum CircuitBreakerStateEnum {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

export interface CircuitBreakerOptions {
  failureThreshold: number; // Numero de falhas consecutivas para abrir o circuito
  timeout: number; // Tempo em milissegundos para considerar uma chamada como falha
  resetTimeout: number; // Tempo em milissegundos para tentar fechar o circuito novamente
}

export interface CircuitBreakerState {
  state: CircuitBreakerStateEnum;
  failureCount: number; // Contador de falhas consecutivas
  lastFailureTime: number; // Timestamp da última falha
  nextAttemptTime: number; // Timestamp para a próxima tentativa de fechar o circuito
}

export interface CircuitBreakerResult<T> {
  success: boolean; // Indica se a chamada foi bem-sucedida ou não
  data?: T; // Dados retornados pela chamada, se houver
  error?: Error; // Erro ocorrido durante a chamada, se houver
  fromCache?: boolean; // Indica se o resultado foi retornado do cache (em caso de circuito aberto)
}

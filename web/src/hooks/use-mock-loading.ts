import { useState, useEffect } from "react";

/**
 * Simula um estado de carregamento por `ms` milissegundos.
 * Útil para ver os skeletons funcionando durante o desenvolvimento com dados mock.
 * Remover quando a Parte 2 (API real) estiver integrada.
 */
export function useMockLoading(ms = 1500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return isLoading;
}

import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // limpeza: cancela o timer anterior se value/delay mudar ou o componente desmontar
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
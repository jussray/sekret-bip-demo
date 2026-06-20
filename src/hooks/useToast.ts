import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [green, setGreen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, isGreen = false) => {
    if (timer.current) clearTimeout(timer.current);
    setMessage(msg);
    setGreen(isGreen);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), 2500);
  }, []);

  return { message, visible, green, showToast };
}

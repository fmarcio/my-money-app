import { useState, useEffect, useRef } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const isCancelled = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password,
      );

      if (!isCancelled.current) {
        setIsPending(false);
        setError(null);
      }

      dispatch({ type: 'LOGIN', payload: res.user });
    } catch (err: any) {
      if (!isCancelled.current) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    isCancelled.current = false;
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return { login, isPending, error };
};

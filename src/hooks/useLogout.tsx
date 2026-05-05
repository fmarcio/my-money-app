import { useEffect, useState, useRef } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
  const isCancelled = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async (): Promise<void> => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(projectAuth);

      if (!isCancelled.current) {
        setIsPending(false);
        setError(null);
      }

      dispatch({ type: 'LOGOUT' });
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

  return { logout, error, isPending };
};

import { get, set } from 'idb-keyval';
import { useCallback, useEffect, useState } from 'react';

export function useIdbKeyvalQuery<T>(
  key: string,
  dependencies?: unknown[]
): [value: T | undefined, additional: { loading: boolean; error: unknown }] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [value, setValue] = useState<T>();
  useEffect(() => {
    setError(undefined);
    let cancelled = false;
    setLoading(true);
    get<T>(key)
      .then((value) => {
        if (!cancelled) {
          setValue(value);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(error);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [key, ...(dependencies ?? [])]);
  return [value, { loading, error }];
}

export function useIdbKeyvalMutation<T>(
  key: string
): [
  setValue: (value: T) => Promise<void>,
  additional: { loading: boolean; error: unknown; isSet: boolean }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [isSet, setIsSet] = useState<boolean>(false);
  const setValue = useCallback(
    async (value: T) => {
      setError(undefined);
      setIsSet(false);
      try {
        setLoading(true);
        await set(key, value);
        setLoading(false);
        setIsSet(true);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [key]
  );
  return [setValue, { loading, error, isSet }];
}

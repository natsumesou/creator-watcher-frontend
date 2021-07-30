import { useBuildTimestampContext } from '@/app';
import { useEffect } from 'react';

const useScript = (url: string) => {
  const {timestamp} = useBuildTimestampContext();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url + (timestamp ? "?_=" + timestamp : "");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;

import { useEffect } from 'react';

const useRedirect = (shouldRedirect, isLoggedIn, history) => {
  
  useEffect(() => {
    if (shouldRedirect) {
      const path = isLoggedIn ? "/onboard" : "/";
      history.push(path);
    }
  }, [shouldRedirect, isLoggedIn, history]);
}

export default useRedirect;

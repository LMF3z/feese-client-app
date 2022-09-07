import { useState } from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (state) => setIsLoading(state);

  return { isLoading, toggleLoading };
};

export default useLoading;

import { useEffect, useState } from 'react';

export const useTextFunction = ({ defaultTextFunction, setFunction }) => {
  const [readyFunction, setReadyFunction] = useState(
    // eslint-disable-next-line no-new-func
    new Function(`return ${defaultTextFunction}`),
  );

  const [selectFunction, setSelectFunction] = useState(defaultTextFunction);

  const handleSaveFunction = () => {
    // eslint-disable-next-line no-new-func
    setReadyFunction(new Function(`return ${selectFunction}`));
  };

  useEffect(() => {
    if (readyFunction) {
      setFunction(() => readyFunction);
    }
  }, [readyFunction]);

  return { handleSaveFunction, setSelectFunction, selectFunction };
};

import { useState, useCallback, useEffect } from 'react'

function useInputListGroup(dataAray, fieldName) {
  const [list, setList] = useState(dataAray);
  const [value, setValue] = useState('');

  function createUniqueOptionsList(dataset, fieldName) {
    return [...new Set(dataset.map((el) => el[fieldName]))].map(
      (el, index) => {
        return (
          <option key={index} value={el}>
            {el}
          </option>
        );
      }
    );
  }

  useEffect(() => {
    if (Array.isArray(dataAray)) {
      if (dataAray.length !== 0) {
        setList(createUniqueOptionsList(dataAray, fieldName));
      }
    }
    return
  }, [dataAray, fieldName])


  function onChange(ev) {
    setValue(ev.target.value);
  }

  return { onChange, list, value }
}

export default useInputListGroup






function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );
      if (!response.ok) { throw new Error('Request failed!'); }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
}


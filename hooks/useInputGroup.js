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
        setList(createUniqueOptionsList(dataAray, fieldName).sort());
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

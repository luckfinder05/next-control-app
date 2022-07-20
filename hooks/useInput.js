import { useState } from 'react'

function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    function onChange(ev) {
        setValue(ev.target.value);
    }
    return [value, onChange]
}

export default useInput;

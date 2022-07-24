import { useState } from 'react'

function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    function onChange(ev) {
        setValue(ev.target.value);
    }
    function resetField() {
        setValue(defaultValue);
    }
    return [value, onChange, resetField]
}

export default useInput;

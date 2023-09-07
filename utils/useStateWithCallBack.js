import { useState } from "react";

const useStateWithCallBack = (initialValue)=>{
    const [value,setValue] = useState(initialValue)

    const setValueAndCallback = (newValue, callback) => {
        setValue(prevValue => {
            if (callback) {
                callback(prevValue, newValue);
            }
            return newValue;
        });
    };
    return [value,setValueAndCallback]
}

export default useStateWithCallBack;
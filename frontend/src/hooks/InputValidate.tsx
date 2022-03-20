import { useState, ChangeEvent, useCallback } from 'react';

type UseInputHook = [
    string,
    (e: ChangeEvent<HTMLInputElement>) => void,
    boolean | undefined,
    (valid: boolean) => void,
    () => void,
];

const useInputValidate = (initialInput: string = ''): UseInputHook => {
    const [input, setInput] = useState(initialInput);
    const [valid, setValid] = useState<boolean>();

    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value), []);
    const changeValid = useCallback((valid: boolean) => setValid(valid), []);

    const setDefaultValue = useCallback(() => setInput(initialInput), []);

    return [input, change, valid, changeValid, setDefaultValue];
};

export default useInputValidate;

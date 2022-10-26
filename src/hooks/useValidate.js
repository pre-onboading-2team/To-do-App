import { useCallback, useState } from "react";

export const useValidate = (validateCallback) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;

      setValue(value);

      if (validateCallback(value)) {
        setIsError(false);
        setIsValid(true);
      }

      if (!validateCallback(value)) {
        setIsError(true);
        setIsValid(false);
      }
    },
    [validateCallback]
  );

  return [value, isError, isValid, handleChange, setValue, setIsError];
};

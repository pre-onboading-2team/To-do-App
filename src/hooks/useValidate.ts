import { ChangeEvent, useCallback, useState } from "react";

type ValidateCallback = (value: string) => boolean;

type UseValidate = (
  callback: ValidateCallback
) => [
  string,
  boolean,
  boolean,
  (event: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useValidate: UseValidate = (validateCallback) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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

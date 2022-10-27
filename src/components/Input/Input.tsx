import { MdError } from "react-icons/md";

import * as S from "./Input.style";

interface Prop {
  type: "password" | "text";
  label?: string;
  id: string;
  value: string;
  comment?: string;
  isError: boolean;
  errorMsg: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  type,
  label,
  id,
  value,
  comment,
  isError,
  errorMsg,
  placeholder,
  onChange,
}: Prop) => {
  return (
    <S.Container isError={isError}>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.InputContainer>
        <S.Input
          type={type}
          id={id}
          value={value}
          isError={isError}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
        {isError && (
          <>
            <MdError />
            <p>{errorMsg}</p>
          </>
        )}
      </S.InputContainer>
      {comment && <S.Comment>{comment}</S.Comment>}
    </S.Container>
  );
};

export default Input;

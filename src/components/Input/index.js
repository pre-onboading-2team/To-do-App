import { MdError } from "react-icons/md";

import * as S from "./style";

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
}) => {
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

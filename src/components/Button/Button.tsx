/* eslint-disable react/button-has-type */
import * as S from "./Button.style";

interface Prop {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled }: Prop) => {
  return (
    <S.Button onClick={onClick} disabled={disabled}>
      {children}
    </S.Button>
  );
};

export default Button;

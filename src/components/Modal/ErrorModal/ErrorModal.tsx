import { IoMdClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import styled from "styled-components";

import useModal from "../useModal";

export const Scontainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 30px;
  font-size: 18px;

  & > svg {
    fill: #e51313;
    color: #e51313;
    font-size: 50px;
  }

  & > button {
    width: 30%;
    padding: 15px 20px;
    color: #ffffff;
    background-color: #374761;
    border: none;
    border-radius: 10px;
    transition: all 0.4s;

    &:hover {
      scale: 1.1;
    }
  }
`;

export const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px !important;
  fill: #161616 !important;
  cursor: pointer;
`;

interface Prop {
  body: string;
  buttonText?: string;
  callback?: () => void;
}

const ErrorModal = ({ body, callback, buttonText }: Prop) => {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    if (callback) {
      callback();
    }
    closeModal();
  };

  return (
    <Scontainer>
      <MdOutlineError />
      <p>{body}</p>
      <button type="button" onClick={handleConfirm}>
        {buttonText || "확인"}
      </button>
      <CloseButton onClick={closeModal} />
    </Scontainer>
  );
};

export default ErrorModal;

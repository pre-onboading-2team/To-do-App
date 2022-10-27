import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export const Add = () => <FontAwesomeIcon icon="fa-solid fa-plus" />;
export const Edit = () => <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />;
export const Delete = () => <FontAwesomeIcon icon="fa-solid fa-trash-can" />;
export const Back = () => <FontAwesomeIcon icon="fa-solid fa-rotate-left" />;
export const Ok = () => <FontAwesomeIcon icon="fa-solid fa-check" />;

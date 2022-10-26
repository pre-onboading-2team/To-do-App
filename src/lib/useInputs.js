import { useReducer } from 'react';

function inputReducer(state, action) {
	return {
		...state,
		[action.name]: action.value,
	};
}

function useInputs(initialForms) {
	const [state, dispatch] = useReducer(inputReducer, initialForms);
	const onChange = (e) => {
		dispatch(e.target);
	};
	return [state, onChange];
}

export default useInputs;

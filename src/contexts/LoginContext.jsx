import { createContext, useContext, useEffect, useReducer } from 'react';

export const ACCESS_TOKEN = 'access_token';

const LoginStateContext = createContext(undefined);

const LoginDispatchContext = createContext(undefined);

function loginReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				isLoggedIn: true,
			};
		case 'LOGOUT':
			return {
				isLoggedIn: false,
			};
		default:
			throw new Error('unhandled login action');
	}
}

export function LoginContextProvider({ children }) {
	const [isLoggedIn, dispatch] = useReducer(loginReducer, {
		isLoggedIn: false,
	});

	useEffect(() => {}, []);

	return (
		<LoginDispatchContext.Provider value={dispatch}>
			<LoginStateContext.Provider value={isLoggedIn}>{children}</LoginStateContext.Provider>
		</LoginDispatchContext.Provider>
	);
}

export function useLoginState() {
	const state = useContext(LoginStateContext);
	if (!state) throw new Error('LoginProvider not found');
	return state;
}

export function useLoginDispatch() {
	const dispatch = useContext(LoginDispatchContext);
	if (!dispatch) throw new Error('LoginProvider not found');
	return dispatch;
}

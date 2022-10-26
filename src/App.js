import { Route, Routes } from 'react-router-dom';
import { Login, SignUp, Todo } from './pages';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/todo" element={<Todo />} />
		</Routes>
	);
}

export default App;

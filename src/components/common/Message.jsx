import styled from 'styled-components';

const PositiveMessage = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: green;
`;
const NegativeMessage = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: red;
`;

export function Message({ type, message }) {
	return type === 'positive' ? (
		<PositiveMessage>{message}</PositiveMessage>
	) : (
		<NegativeMessage>{message}</NegativeMessage>
	);
}

import styled from 'styled-components';

const PageTitleText = styled.h1`
	font-family: 'Spoqa Han Sans Neo', 'sans-serif';
	font-weight: 700;
	margin-bottom: 2rem;
`;

export function PageTitle({ children }) {
	return <PageTitleText>{children}</PageTitleText>;
}

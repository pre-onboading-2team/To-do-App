import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  & > div:first-child {
    flex-basis: 80%;
  }
  & > button:last-child {
    flex-basis: 20%;
  }
`;

export const UList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  margin: 50px 0;
`;

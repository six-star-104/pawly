import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.div<{ $active?: boolean }>`
  padding: 1rem;
  color: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.yellow};
  }
  @media (max-width: 767px) {
    padding: 0.5rem;
    font-weight: normal;
    font-family: "Righteous";
    margin-bottom: 2rem;
  }
`;

import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 1rem;
  border: none;
  background: none;
  outline: none;
  color: ${(props) =>
    props.$active ? props.theme.colors.darkpurple : props.theme.colors.text};
  font-weight: ${(props) => (props.$active ? "800" : "500")};
  cursor: pointer;

  &:disabled {
    color: ${(props) => props.theme.colors.paginationDisabled};
  }
`;

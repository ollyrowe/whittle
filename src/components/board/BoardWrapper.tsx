import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

const BoardWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <Background {...props}>
        <OuterContainer>
          <InnerContainer ref={ref}>{children}</InnerContainer>
        </OuterContainer>
      </Background>
    );
  }
);

export default BoardWrapper;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const OuterContainer = styled.div`
  margin: auto;
`;

const InnerContainer = styled.div`
  padding: ${(props) => props.theme.spacing(1)};
`;

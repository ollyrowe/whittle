import React from "react";
import styled from "styled-components";

interface Props extends ContainerProps {
  children?: React.ReactNode;
}

const BoardWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ children, dense = false, ...props }, ref) => {
    return (
      <Background {...props}>
        <Container ref={ref} dense={dense}>
          {children}
        </Container>
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

interface ContainerProps {
  dense?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: auto;
  padding: ${(props) => !props.dense && props.theme.spacing(1)};
`;

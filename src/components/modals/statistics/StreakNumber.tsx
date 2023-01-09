import React from "react";
import styled from "styled-components";
import FireAnimation from "../../animations/FireAnimation";

interface Props {
  number: number;
  disabled?: boolean;
}

const StreakNumber: React.FC<Props> = ({ number, disabled }) => {
  const digits = String(number).split("");

  return (
    <Container disabled={disabled}>
      <Fire play={!disabled} />
      <Numbers>
        {digits.map((digit, index) => (
          <Number key={index} outline={shouldApplyOutline(digits, index)}>
            {digit}
          </Number>
        ))}
      </Numbers>
    </Container>
  );
};

export default StreakNumber;

/**
 * Determines whether an outline should be applied to a given digit within a number.
 *
 * Essentially, if the number has over two digits, then it may fall outside of the
 * bounds of the fire animation, therefore a text outline should be applied to prevent
 * white text on a white background. This outline is not applied to the middle numbers.
 *
 */
const shouldApplyOutline = (digits: string[], digitIndex: number) => {
  // If there is a middle digit, i.e. 1, 123, 12345
  return isOddNumber(digits.length)
    ? // If the digit isn't the middle digit
      digitIndex !== Math.ceil(digits.length / 2) - 1
    : // If the digit isn't one of the middle two digits
      digitIndex !== digits.length / 2 && digitIndex !== digits.length / 2 - 1;
};

/**
 * Determines whether a number is odd.
 */
const isOddNumber = (number: number) => {
  return number % 2 === 1;
};

interface ContainerProps {
  disabled?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  filter: ${(props) => props.disabled && "grayscale(100%)"};
`;

const Fire = styled(FireAnimation)`
  width: 80px;
  height: 80px;
`;

const Numbers = styled.div`
  display: flex;
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translate(-50%);
  font-weight: 600;
  font-size: 30px;
  color: white;
  -webkit-text-stroke: 1px;
`;

interface Prop {
  /** Whether a text outline should be applied to the number */
  outline: boolean;
}

const Number = styled.div<Prop>`
  margin: 0.5px;
  text-shadow: ${(props) =>
    props.outline &&
    `1px 1px 0 ${props.theme.palette.orange.dark},
    -1px 1px 0 ${props.theme.palette.orange.dark},
    1px -1px 0 ${props.theme.palette.orange.dark},
    -1px -1px 0 ${props.theme.palette.orange.dark},
    0px 1px 0 ${props.theme.palette.orange.dark},
    0px -1px 0 ${props.theme.palette.orange.dark},
    -1px 0px 0 ${props.theme.palette.orange.dark},
    1px 0px 0 ${props.theme.palette.orange.dark},
    2px 2px 0 ${props.theme.palette.orange.dark},
    -2px 2px 0 ${props.theme.palette.orange.dark},
    2px -2px 0 ${props.theme.palette.orange.dark},
    -2px -2px 0 ${props.theme.palette.orange.dark},
    0px 2px 0 ${props.theme.palette.orange.dark},
    0px -2px 0 ${props.theme.palette.orange.dark},
    -2px 0px 0 ${props.theme.palette.orange.dark},
    2px 0px 0 ${props.theme.palette.orange.dark},
    1px 2px 0 ${props.theme.palette.orange.dark},
    -1px 2px 0 ${props.theme.palette.orange.dark},
    1px -2px 0 ${props.theme.palette.orange.dark},
    -1px -2px 0 ${props.theme.palette.orange.dark},
    2px 1px 0 ${props.theme.palette.orange.dark},
    -2px 1px 0 ${props.theme.palette.orange.dark},
    2px -1px 0 ${props.theme.palette.orange.dark},
    -2px -1px 0 ${props.theme.palette.orange.dark}`};
`;

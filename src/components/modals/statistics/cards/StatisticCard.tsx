import { alpha, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import styled from "styled-components";
import { colours } from "../../../../misc/colours";

interface Props {
  title: string;
  icon?: React.ReactNode;
  color?: StatisticCardColor;
  disabled?: boolean;
  children?: React.ReactNode;
}

const StatisticCard: React.FC<Props> = ({
  title,
  children,
  icon,
  color = "default",
  disabled = false,
}) => {
  const theme = useTheme();

  const backgroundColour = useMemo(() => {
    if (disabled) {
      return alpha(theme.palette.text.primary, 0.1);
    }

    switch (color) {
      case "green":
        return theme.palette.tile.green;
      case "blue":
        return theme.palette.tile.blue;
      case "default":
        return theme.palette.border;
    }
  }, [disabled, color, theme]);

  return (
    <Background color={backgroundColour}>
      <Title disabled={disabled}>{title}</Title>
      <Container>
        {icon && <Icon>{icon}</Icon>}
        <Content>{children}</Content>
      </Container>
    </Background>
  );
};

export default StatisticCard;

type StatisticCardColor = "green" | "blue" | "default";

const Background = styled.div`
  width: 85px;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  margin: ${(props) => props.theme.spacing(1)};
`;

interface TitleProps {
  disabled?: boolean;
}

const Title = styled.div<TitleProps>`
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => !props.disabled && colours.white};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 6px;
  margin: 3px;
  margin-top: 0px;
  background-color: ${(props) => props.theme.palette.background.default};
`;

const Icon = styled.div`
  display: flex;
  margin-right: 4px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

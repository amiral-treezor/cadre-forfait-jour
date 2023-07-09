import React, { ReactNode } from "react";
import styled from "styled-components";
import { Colors, TColor } from "../utils";

type TSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";

interface TypographyProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
  size?: TSize;
  bold?: boolean;
  button?: boolean;
  italic?: boolean;
  color?: TColor;
  children: ReactNode;
}

const sizeMap: Record<TSize, string> = {
  small: "12px",
  medium: "16px",
  large: "20px",
  xlarge: "24px",
  xxlarge: "32px",
};

const StyledTypography = styled.div<TypographyProps>`
  font-family: "Rajdhani", sans-serif;
  font-size: ${(props) => sizeMap[props.size!]};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
  cursor: ${(props) => (props.button ? "pointer" : "normal")};
  color: ${(props) => Colors[props.color!]};
`;

export const Typography = ({
  size = "small",
  color = "default",
  children,
  ...rest
}: TypographyProps) => (
  <StyledTypography {...rest} size={size} color={color} >
    {children}
  </StyledTypography >
);

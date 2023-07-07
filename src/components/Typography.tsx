import React, { ReactNode } from "react";
import styled from "styled-components";
import { Colors, TColor } from "../utils";

type TSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";

interface TypographyProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
  size?: TSize;
  bold?: boolean;
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
  color: ${(props) => Colors[props.color!]};
`;

export const Typography = ({
  size = "small",
  bold,
  color = "default",
  children,
  ...rest
}: TypographyProps) => (
  <StyledTypography {...rest} size={size} bold={bold} color={color}>
    {children}
  </StyledTypography>
);

import React from "react";
import styled from "styled-components";
import { Formatter } from "../utils";
import { Typography } from "./Typography";

interface AmountProps {
  label: string;
  value: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Amount: React.FC<AmountProps> = ({ label, value }) => {
  return (
    <Container>
      <AmountContainer>
        <Typography size="large" bold>
          {Formatter.format(value)}
        </Typography>
        <Typography size="medium">/an</Typography>
      </AmountContainer>

      <Typography size="medium">{label}</Typography>
    </Container>
  );
};

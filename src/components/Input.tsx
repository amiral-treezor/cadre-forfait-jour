import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type"
  > {
  label: string;
  onChange: (value: number) => void;
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

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  caret-color: #fff;

  ::placeholder {
    color: #999;
  }
`;

export const Input: React.FC<InputProps> = ({
  label,
  onChange,
  ...inputProps
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <Container>
      <AmountContainer>
        <InputField
          type="number"
          onChange={handleInputChange}
          {...inputProps}
        />
        <Typography size="medium">/an</Typography>
      </AmountContainer>

      <Typography size="medium">{label}</Typography>
    </Container>
  );
};

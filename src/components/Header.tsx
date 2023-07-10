import { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Amount } from "./Amount";
import { Input } from "./Input";
import { Typography } from "./Typography";

const Container = styled.div``;

const SalaireContainer = styled.div`
  display: flex;
  gap: 2vw;
  align-items: center;
`;

const AmountsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 1vw;
  flex-direction: row;
  align-items: center;
`;

export interface IHeaderSalary {
  brut: number;
  prime: number;
}
interface IHeaderProps {
  onSubmit: (salary: IHeaderSalary) => void;
}

export const Header = ({ onSubmit }: IHeaderProps) => {
  const [brut, setBrut] = useState<number>();
  const [prime, setPrime] = useState<number>();
  const [edit, setEdit] = useState(false);

  const handleSubmit = () => {
    if (edit && brut && prime) onSubmit({ brut, prime });
    setEdit(!edit);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container>
      <SalaireContainer>
        <Typography size="xlarge" bold>
          Ton salaire
        </Typography>
        <Typography button size="medium" onClick={handleSubmit}>
          {!edit && "MODIFIER"}
        </Typography>
      </SalaireContainer>

      {edit ? (
        <AmountsContainer onKeyDown={handleKeyPress}>
          <Input label="Salaire brut" defaultValue={brut} onChange={setBrut} />
          <Input
            label="Primes brutes"
            defaultValue={prime}
            onChange={setPrime}
          />
          <Typography
            button
            size="medium"
            color="success"
            onClick={handleSubmit}
          >
            METTRE A JOUR MON SALAIRE
          </Typography>
        </AmountsContainer>
      ) : (
        <AmountsContainer>
          <Amount label="Salaire" value={(brut ?? 0) + (prime ?? 0)} />
          <Amount label="Salaire de base" value={brut ?? 0} />
          <Amount label="Primes" value={prime ?? 0} />
        </AmountsContainer>
      )}
    </Container>
  );
};

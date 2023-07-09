import { useEffect, useState } from "react";
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
  const [brut, setBrut] = useState<number>(70000);
  const [prime, setPrime] = useState<number>(7000);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onSubmit({ brut, prime });
  }, []);

  const handleSubmit = () => {
    if (edit) onSubmit({ brut, prime });
    setEdit(!edit);
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
        <AmountsContainer>
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
          <Amount label="Salaire" value={brut + prime} />
          <Amount label="Salaire de base" value={brut} />
          <Amount label="Primes" value={prime} />
        </AmountsContainer>
      )}
    </Container>
  );
};

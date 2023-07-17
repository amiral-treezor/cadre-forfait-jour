import styled from "styled-components";
import { ISalary } from "../model";
import { PieChart } from "./PieChart";
import { Typography } from "./Typography";

const Container = styled.div``;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, min(80vw, 400px));
  flex-direction: row;
  align-items: center;
`;

interface IRepartitionProps {
  salary: ISalary;
  months: 1 | 12;
}

export const Repartition = ({ salary, months }: IRepartitionProps) => {
  const chart = {
    hour: [
      ["Répartition", "Montant"],
      ["Salaire net d'impôts", salary.hour.netSalaryAfterTax / months],
      ["Impôts", salary.hour.taxes / months],
      ["Charges sociales", salary.hour.socialCharges / months],
    ],
    day: [
      ["Répartition", "Montant"],
      ["Salaire net d'impôts", salary.day.netSalaryAfterTax / months],
      ["Impôts", salary.day.taxes / months],
      ["Charges sociales", salary.day.socialCharges / months],
    ],
  };

  return (
    <Container>
      <Typography italic size="medium">
        Ces calculs sont des estimations et ne prennent pas en compte tous les
        facteurs individuels (avantages en nature, mutuelles, titres
        restauration, indemnités quelconques), ou les exonération spécifiques à
        ta situation personnelle. Ce n'est qu'une estimation !
      </Typography>

      <ChartsContainer>
        <PieChart label="Cadre 39 heures" data={chart.hour} />
        <PieChart label="Cadre forfait jour" data={chart.day} />
      </ChartsContainer>
    </Container>
  );
};

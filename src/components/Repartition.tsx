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
      <Typography italic size="small">
        Ces calculs sont des estimations et ne considèrent pas tous les facteurs
        individuels tels que les avantages en nature (tickets restaurants,
        mutuelle...) ou les exonérations spécifiques en lien avec ta situation
        personelle. Consulte le service des ressources humaines pour une
        évaluation plus précise.
      </Typography>

      <ChartsContainer>
        <PieChart label="Cadre au forfait 39 heures" data={chart.hour} />
        <PieChart label="Cadre au forfait jour" data={chart.day} />
      </ChartsContainer>
    </Container>
  );
};

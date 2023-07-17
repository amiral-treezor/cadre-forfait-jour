import styled from "styled-components";
import { ISalary } from "../model";
import { Typography } from "./Typography";
import { Constants, Formatter, Tools } from "../utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

interface IImpactsProps {
  salary: ISalary;
}

export const Impacts = ({ salary }: IImpactsProps) => {
  const salaryLoss =
    salary.hour.netSalaryAfterTax - salary.day.netSalaryAfterTax;

  const increaseNecessary =
    (Tools.calculImpots(salary.hour.netSalaryAfterTax + salary.day.taxes) +
      salary.hour.netSalaryAfterTax) /
    (1 - Constants.rateSocialCharges);

  return (
    <Container>
      <Typography size="medium">
        Selon nos estimations, en gardant ton salaire en passant au forfait jour
        : tu aurais une une perte sur ton pouvoir d'achat estimée à hauteur de{" "}
        <b>{Formatter.format(salaryLoss)}/an</b> (
        {Formatter.format(salaryLoss / 12)}/mois).
      </Typography>

      <Typography size="medium">
        Cette perte correspond à l'absence d'exonération liée à tes heures
        supplémentaires, réparties comme suit :
        <ul>
          <li>
            Exonération des charges sociales{" "}
            <b>{Formatter.format(salary.hour.socialChargesExemption)}/an</b> (
            {Formatter.format(salary.hour.socialChargesExemption / 12)}/mois)
          </li>
          <li>
            Exonération de l'impôt sur le revenu{" "}
            <b>{Formatter.format(salary.hour.incomeTaxExemption)}/an</b> (
            {Formatter.format(salary.hour.incomeTaxExemption / 12)}/mois)
          </li>
        </ul>
      </Typography>

      <Typography size="medium">
        Selon notre estimation, il te faudrait demander un salaire brut annuel
        (primes incluses ) d'environ :{" "}
        <b>{Formatter.format(increaseNecessary)}</b> si tu souhaites passer au
        forfait jour.
        <br />
      </Typography>

      <Typography size="medium">
        Il convient de différencier cette augmentation annuelle de celle liée à
        la performance, afin de garantir ton pouvoir d'achat et une performance
        correctement récompensée.
      </Typography>
    </Container>
  );
};

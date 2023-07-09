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
        Selon nos estimations, ton passage au forfait jour entraînerait une
        perte nette sur ton pouvoir d'achat de{" "}
        <b>{Formatter.format(salaryLoss)}/an</b> (
        {Formatter.format(salaryLoss / 12)}/mois).
      </Typography>

      <Typography size="medium">
        Cette perte correspond à l'absence d'exonérations liées à tes actuelles
        heures supplémentaires :
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
        A titre informatif, pour ne pas être impacté financièrement au passage
        du forfait jour, il serait nécessaire d'avoir un salaire brut annuel
        (primes comprises) de <b>{Formatter.format(increaseNecessary)}</b>.
      </Typography>

      <Typography size="medium">
        Il convient de différencier cette augmentation annuelle de celle liée à
        la performance, afin de garantir ton pouvoir d'achat et une performance
        correctement récompensée.
      </Typography>

      <Typography size="medium">
        Cependant, il est important de prendre en compte d'autres critères tels
        que la flexibilité horaire, l'autonomie dans l'organisation du travail,
        la conciliation entre vie professionnelle et vie personnelle, ainsi que
        l'adaptation aux pics d'activité.
      </Typography>

      <Typography size="medium">
        N'hésite pas à nous contacter si tu as des questions ou besoin de plus
        d'informations.
      </Typography>
    </Container>
  );
};

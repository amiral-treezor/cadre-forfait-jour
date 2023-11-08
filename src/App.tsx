import { useState } from "react";
import { styled } from "styled-components";
import LogoCSE from "./assets/logo-cse.jpg";
import { Header, IHeaderSalary } from "./components/Header";
import { Repartition } from "./components/Repartition";
import { ISalary } from "./model";
import { Constants, Tools } from "./utils";
import { Impacts } from "./components/Impacts";
import { Typography } from "./components/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin: 3vh 10vw;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AnalyseContainer = styled.div`
  display: flex;
  gap: 2vw;
  align-items: center;
`;

const Logo = styled.img`
  justify-self: flex-end;
  align-self: flex-start;
  width: 60px;
`;

const App = () => {
  const [salary, setSalary] = useState<ISalary>();
  const [months, setMonths] = useState<1 | 12>(1);

  const onSalaryChange = ({ brut, prime }: IHeaderSalary) => {
    const total = brut + prime;

    if (!total) return;

    const hourBrutOvertime =
      (brut * Constants.hoursOvertimeByMonth) /
      (Constants.hoursByMonth + Constants.hoursOvertimeByMonth);
    const hourSocialChargesExemption =
      hourBrutOvertime * Constants.rateSocialChargesExemption;
    const hourSocialCharges =
      total * Constants.rateSocialCharges - hourSocialChargesExemption;
    const hourNetSalary = total - hourSocialCharges;
    const hourIncomeTaxExemption =
      Tools.calculImpots(hourNetSalary) -
      Tools.calculImpots(
        hourNetSalary -
          Math.min(
            hourBrutOvertime * Constants.rateTaxesOvertimeExemption,
            7500
          )
      );
    const hourTaxes =
      Tools.calculImpots(hourNetSalary) - hourIncomeTaxExemption;

    const daySocialCharges = total * Constants.rateSocialCharges;
    const dayNetSalary = total - daySocialCharges;
    const dayTaxes = Tools.calculImpots(dayNetSalary);

    setSalary({
      hour: {
        netSalaryAfterTax: hourNetSalary - hourTaxes,
        socialCharges: hourSocialCharges,
        taxes: hourTaxes,
        incomeTaxExemption: hourIncomeTaxExemption,
        socialChargesExemption: hourSocialChargesExemption,
      },
      day: {
        netSalaryAfterTax: dayNetSalary - dayTaxes,
        socialCharges: daySocialCharges,
        taxes: dayTaxes,
      },
    });
  };

  return (
    <Container>
      <TitleContainer>
        <Typography bold size="xxlarge">
          Passage au forfait jour
        </Typography>
        <Logo src={LogoCSE} />
      </TitleContainer>

      <Typography size="medium">
        Ton CSE a mis en place cet outil pour te permettre de calculer de
        manière estimative ton nouveau salaire si tu souhaites passer au forfait
        jour alors que tu es en contrat heure. <br />
        ATTENTION : ce ne sont que des calculs sur une base fournie par l'état,
        le vrai calcul est beaucoup plus complexe et nous ne sommes pas RH.
        C'est une valeur approximative !<br />
        Nous ne stockons aucune information, aucune donnée, ce qui garanti ton
        anonymat lors de son utilisation.
      </Typography>

      <Header onSubmit={onSalaryChange} />

      {salary && (
        <>
          <AnalyseContainer>
            <Typography size="xlarge" bold>
              Tes impacts
            </Typography>
            <Typography
              button
              size="medium"
              onClick={() => (months === 1 ? setMonths(12) : setMonths(1))}
            >
              {months === 1 ? "MONTANTS MENSUELS" : "MONTANTS ANNUELS"}
            </Typography>
          </AnalyseContainer>

          <Repartition months={months} salary={salary} />

          <Impacts salary={salary} />
        </>
      )}
    </Container>
  );
};

export default App;

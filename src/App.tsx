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
        Cet outil te permettra de découvrir les implications financières d'un
        passage au forfait jour si tu es cadre au forfait 39h. <br />
        Saisis simplement ton salaire actuel et toute prime éventuelle, et notre
        outil te présentera les différences financières à prendre en compte.
      </Typography>

      <Header onSubmit={onSalaryChange} />

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

      {salary && (
        <>
          <Repartition months={months} salary={salary} />
          <Impacts salary={salary} />
        </>
      )}
    </Container>
  );
};

export default App;

import { useMemo, useState } from "react";
import { styled } from "styled-components";
import "./App.css";
import LogoCSE from "./assets/logo-cse.jpg";
import { Amount } from "./components/Amount";
import { Input } from "./components/Input";
import { PieChart } from "./components/PieChart";
import { Typography } from "./components/Typography";
import { Constants, Tools } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  margin: 3vh 10vw;
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 5vw;
`;

const SalaireContainer = styled.div`
  display: flex;
  gap: 0.5vw;
  align-items: center;
`;

const AmountsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  flex-direction: row;
  align-items: center;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  align-items: center;
`;

interface ISalaire {
  brut: number;
  forfaitJour: {
    net: number;
    impots: number;
  };
  forfaitHeure: {
    base: number;
    heuresSupp: number;
    impots: number;
  };
}

const App = () => {
  const [brut, setBrut] = useState<number>(0);
  const [prime, setPrime] = useState<number>(0);
  const [edit, setEdit] = useState(false);

  // const salaire = useMemo<ISalaire | undefined>(() => {
  //   const brutPrime = brut + prime;

  //   const brutSupp =
  //     (brut * Constants.heuresSupp) / (Constants.heures + Constants.heuresSupp);

  //   const net = brutPrime * (1 - Constants.tauxNet);
  //   return {
  //     brut: brutPrime,
  //     forfaitHeure: {
  //       net,
  //       impots: Tools.calculImpots(
  //         0.9 *
  //           (brutPrime - Math.max(brutSupp * (1 - Constants.tauxNet), 7500)) *
  //           (1 - Constants.tauxNet)
  //       ),
  //     },
  //     forfaitJour: {
  //       net,
  //       impots: Tools.calculImpots(0.9 * brutPrime * (1 - Constants.tauxNet)),
  //     },
  //   };
  // }, [brut, prime]);

  const chart = {
    heure: [
      ["Répartition", "Montant"],
      ["Salaire net d'impôts", 11],
      ["Impôts", 2],
      ["Charges sociales", 2],
      ["Exonération (Charges sociales)", 2],
      ["Exonération (Impôts sur le revenu)", 2],
    ],
    jour: [
      ["Répartition", "Montant"],
      ["Salaire net d'impôts", 11],
      ["Impôts", 2],
      ["Charges sociales", 2],
      ["Exonération (Charges sociales)", 2],
      ["Exonération (Impôts sur le revenu)", 2],
    ],
  };

  return (
    <Container>
      <Logo src={LogoCSE} />

      <SalaireContainer>
        <Typography size="xxlarge" bold>
          Mon salaire
        </Typography>
        <Typography size="medium" bold onClick={() => setEdit(!edit)}>
          {edit ? "VALIDER" : "MODIFIER"}
        </Typography>
      </SalaireContainer>

      {!edit ? (
        <AmountsContainer>
          <Amount label="Salaire" value={brut + prime} />
          <Amount label="Salaire de base" value={brut} />
          <Amount label="Primes" value={prime} />
        </AmountsContainer>
      ) : (
        <AmountsContainer>
          <Input label="Salaire brut" onChange={setBrut} />
          <Input label="Primes brutes" value={prime} onChange={setPrime} />
        </AmountsContainer>
      )}

      <Typography size="xxlarge" bold>
        Répartition
      </Typography>

      <ChartsContainer>
        <PieChart data={chart.heure} />
        <PieChart data={chart.jour} />
      </ChartsContainer>
    </Container>
  );
};

export default App;

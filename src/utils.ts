export const Constants = {
  heures: 151.67,
  heuresSupp: 10.83 * 1.25,
  tauxNet: 0.2026401509,
  tauxExoneration: 0.1101,
  tranches: {
    palier11: 10777,
    palier30: 27478,
    palier41: 78570,
    palier45: 168994,
  },
};

export const Tools = {
  calculImpots: (salaire: number) => {
    let impot = 0;

    if (salaire > 0 && salaire <= Constants.tranches.palier11) {
      impot = salaire * 0.0; // Taux d'imposition de 0%
    } else if (
      salaire > Constants.tranches.palier11 &&
      salaire <= Constants.tranches.palier30
    ) {
      impot = (salaire - Constants.tranches.palier11) * 0.11; // Taux d'imposition de 11%
    } else if (
      salaire > Constants.tranches.palier30 &&
      salaire <= Constants.tranches.palier41
    ) {
      impot =
        (salaire - Constants.tranches.palier30) * 0.3 +
        (Constants.tranches.palier30 - Constants.tranches.palier11) * 0.11; // Taux d'imposition de 30%
    } else if (
      salaire > Constants.tranches.palier41 &&
      salaire <= Constants.tranches.palier45
    ) {
      impot =
        (salaire - Constants.tranches.palier41) * 0.41 +
        (Constants.tranches.palier41 - Constants.tranches.palier30) * 0.3; // Taux d'imposition de 41%
    } else if (salaire > Constants.tranches.palier45) {
      impot =
        (salaire - Constants.tranches.palier45) * 0.45 +
        (Constants.tranches.palier45 - Constants.tranches.palier41) * 0.45; // Taux d'imposition de 45%
    }

    return impot;
  },
};

export const Colors = {
  default: "#000000",
  primary: "#007bff",
  secondary: "#dc3545",
} as const;

export type TColor = keyof typeof Colors;

export const Formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

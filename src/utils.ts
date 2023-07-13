export const Constants = {
  hoursByMonth: 151.67,
  // hoursOvertimeByMonth: 10.83 * 1.25,
  hoursOvertimeByMonth: 10.83 * 1.25,
  rateSocialCharges: 0.21166295,
  rateSocialChargesExemption: 0.1101,
  rateTaxesOvertimeExemption: 0.93305439,
  taxesSteps: {
    step11: 10777,
    step30: 27478,
    step41: 78570,
    step45: 168994,
  },
};

export const Tools = {
  calculImpots: (salaire: number) => {
    salaire = salaire * 0.9;
    if (salaire > 0 && salaire <= Constants.taxesSteps.step11) {
      return 0.0; // Taux d'imposition de 0%
    } else if (
      salaire > Constants.taxesSteps.step11 &&
      salaire <= Constants.taxesSteps.step30
    ) {
      return (salaire - Constants.taxesSteps.step11) * 0.11; // Taux d'imposition de 11%
    } else if (
      salaire > Constants.taxesSteps.step30 &&
      salaire <= Constants.taxesSteps.step41
    ) {
      return (salaire - Constants.taxesSteps.step30) * 0.3 +
        (Constants.taxesSteps.step30 - Constants.taxesSteps.step11) * 0.11; // Taux d'imposition de 30%
    } else if (
      salaire > Constants.taxesSteps.step41 &&
      salaire <= Constants.taxesSteps.step45
    ) {
      return (salaire - Constants.taxesSteps.step41) * 0.41 +
        (Constants.taxesSteps.step41 - Constants.taxesSteps.step30) * 0.3; // Taux d'imposition de 41%
    } else {
      return (salaire - Constants.taxesSteps.step45) * 0.45 +
        (Constants.taxesSteps.step45 - Constants.taxesSteps.step41) * 0.45; // Taux d'imposition de 45%
    }
  },
  calculSalaire: (impot: number) => {
    const impotStep11 = Constants.taxesSteps.step11 * 0;
    const impotStep30 = impotStep11 + (Constants.taxesSteps.step30 - Constants.taxesSteps.step11) * 0.11;
    const impotStep41 = impotStep30 + (Constants.taxesSteps.step41 - Constants.taxesSteps.step30) * 0.30;
    const impotStep45 = impotStep41 + (Constants.taxesSteps.step45 - Constants.taxesSteps.step41) * 0.41;

    if (impot <= impotStep11) {
      return 0.0; // Taux d'imposition de 0%
    } else if (impot <= impotStep30) {
      return (Constants.taxesSteps.step11 + (impot - impotStep11) / 0.11) / 0.9; // Taux d'imposition de 11%
    } else if (impot <= impotStep41) {
      return (Constants.taxesSteps.step30 + (impot - impotStep30) / 0.3) / 0.9; // Taux d'imposition de 30%
    } else if (impot <= impotStep45) {
      return (Constants.taxesSteps.step41 + (impot - impotStep41) / 0.41) / 0.9; // Taux d'imposition de 41%
    } else {
      return (Constants.taxesSteps.step45 + (impot - impotStep45) / 0.45) / 0.9; // Taux d'imposition de 45%
    }
  }
};

export const Colors = {
  default: "#000000",
  primary: "#007bff",
  secondary: "#dc3545",
  success: '#4caf50',
  error: '#f44336'
} as const;

export type TColor = keyof typeof Colors;

export const Formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

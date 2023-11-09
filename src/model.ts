export interface ISalary {
  total: {
    brut: number;
    prime: number;
  };
  hour: {
    netSalaryAfterTax: number;
    taxes: number;
    socialCharges: number;
    socialChargesExemption: number;
    incomeTaxExemption: number;
  };
  day: {
    netSalaryAfterTax: number;
    taxes: number;
    socialCharges: number;
  };
}

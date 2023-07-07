import { Chart } from "react-google-charts";

interface PieChartProps {
  data: Array<Array<string | number>>;
}

export const PieChart = ({ data }: PieChartProps) => {
  const options = {
    height: 500,
    pieSliceText: "value",
    pieSliceTextStyle: {
      color: "white",
    },
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width="100%"
      height="500px"
      formatters={[
        {
          column: 1,
          type: "NumberFormat",
          options: { suffix: " €", fractionDigits: 0 },
        },
      ]}
    />
  );
};

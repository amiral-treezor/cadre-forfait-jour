import { Chart } from "react-google-charts";
import styled from "styled-components";
import { Typography } from "./Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface PieChartProps {
  label: string;
  data: Array<Array<string | number>>;
}

export const PieChart = ({ label, data }: PieChartProps) => {
  return (
    <Container>
      <Chart
        chartType="PieChart"
        data={data}
        options={{
          pieSliceText: "value",
          pieSliceTextStyle: { color: "white" },
          legend: { position: "top" },
          chartArea: { width: "100%", height: "80%" },
        }}
        height="min(30vh)"
        width="min(80vw, 400px)"
        formatters={[
          {
            column: 1,
            type: "NumberFormat",
            options: { suffix: " €", fractionDigits: 0 },
          },
        ]}
      />
      <Typography size="medium">{label}</Typography>
    </Container>
  );
};

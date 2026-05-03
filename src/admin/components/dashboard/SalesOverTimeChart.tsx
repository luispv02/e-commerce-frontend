import type { Sale } from "../../interface/dashboard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface Props {
  sales: Sale[];
}

export const SalesOverTimeChart = ({ sales }: Props) => {

  return (
    <div className="w-full overflow-auto">
      <LineChart
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "30vh",
          aspectRatio: 1.618,
          fontSize: "10px"
        }}
        responsive
        data={sales}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
        <XAxis dataKey="date" stroke="#a0a0a0" />
        <YAxis width="auto" stroke="#a0a0a0" />
        
        <Tooltip
          cursor={{
            stroke: "gray",
          }}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "gray",
            color: "black",
            fontSize: "12px",
            padding: "6px"
          }}
        />
        
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="black"
          dot={{
            fill: "black",
          }}
          activeDot={{ r: 5, stroke: "black" }}
        />
      </LineChart>
    </div>
  );
};

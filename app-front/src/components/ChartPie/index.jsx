import React, { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const coins = [
  { symbol: "ETH", amount: 200, color: "var(--GREEN_700)", inUSD: 1.48 },
  { symbol: "BTC", amount: 0.005, color: "var(--VIOLET)", inUSD: 37363 },
  { symbol: "USDT", amount: 5, color: "var(--RED)", inUSD: 37.6 },
  { symbol: "DOGE", amount: 0.062, color: "var(--YELLOW)", inUSD: 2547 },
];

export default function ChartPie() {
  const [active, setActive] = useState(null);
  const width = 400;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={coins}
            pieValue={(data) => data.amount * data.inUSD}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.symbol == data.symbol ? 12 : 8;
              return half - size;
            }}
            padAngle={0.11}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                // console.log(arc);
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>

          {active ? (
            <>
              <Text textAnchor="middle" fill="#000" fontSize={40} dy={-20}>
                {`$${Math.floor(active.amount * active.inUSD)}`}
              </Text>

              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={40}
                dy={20}
              >
                {`${active.amount} ${active.symbol}`}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fill="#000" fontSize={45} dy={-20}>
                {`$${Math.floor(
                  coins.reduce((acc, coin) => acc + coin.amount * coin.inUSD, 0)
                )}`}
              </Text>

              <Text textAnchor="middle" fill="#aaa" fontSize={45} dy={20}>
                {`${coins.length} Assets`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
}

import React from "react";
import { Visualizer, Content, Controls } from "~/components/Visualizer";
import { Counter } from "~/components/Counter";
import { PathVisualizer } from "./PathVisualizer";
import { parse } from "./utils";

const heart = `M11.995 7.23319
C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972
C4.4959 8.14609 4.2403 10.6312 5.66654 12.3892
L11.995 18.25
L18.3235 12.3892
C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972
C15.8305 5.18899 13.4446 5.60999 11.995 7.23319
Z`;

const print = `M12 11
c0 3.517-1.099 6.799-2.753 9.571
m-3.44-2.041.054-.09
A13.916 13.916 0 008 11
a4 4 0 118 0
c0 1.017-.07 2.019-.203 3
m-2.118 6.844
A21.88 21.88 0 0015.171 17
m3.839 1.132
c.645-2.266.99-4.659.99-7.132
A8 8 0 008 4.07
M3 15.364
c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4`;

const paperclip = `M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48`;

const phone = `M 22 16.92 v 3 a 2 2 0 0 1 -2.18 2 a 19.79 19.79 0 0 1 -8.63 -3.07 a 19.5 19.5 0 0 1 -6 -6 a 19.79 19.79 0 0 1 -3.07 -8.67 A 2 2 0 0 1 4.11 2 h 3 a 2 2 0 0 1 2 1.72 a 12.84 12.84 0 0 0 0.7 2.81 a 2 2 0 0 1 -0.45 2.11 L 8.09 9.91 a 16 16 0 0 0 6 6 l 1.27 -1.27 a 2 2 0 0 1 2.11 -0.45 a 12.84 12.84 0 0 0 2.81 0.7 A 2 2 0 0 1 22 16.92 Z`;

const commands = parse(phone);

export const Default = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [size, setSize] = React.useState(30);
  return (
    <Visualizer>
      <Content>
        <svg viewBox={`0 0 ${size} ${size}`}>
          <PathVisualizer
            size={size}
            activeIndex={activeIndex}
            commands={commands}
          />
        </svg>
      </Content>
      <Controls css={{ justifyContent: "space-between" }}>
        <Counter
          value={activeIndex}
          onChange={setActiveIndex}
          min={0}
          max={commands.length - 1}
        >
          {activeIndex}
        </Counter>
        <Counter value={size} onChange={setSize} min={10} max={120} step={10}>
          {size}
        </Counter>
      </Controls>
    </Visualizer>
  );
};

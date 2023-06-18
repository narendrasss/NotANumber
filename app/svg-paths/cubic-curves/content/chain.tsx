import React from "react";
import { motion } from "framer-motion";
import {
  type CommandWithCode,
  Command,
  useEditablePath,
} from "app/svg-paths/utils";
import { useStateContext } from "../state";
import {
  createInitialState,
  DragGroup,
} from "app/svg-paths/components/drag-group";
import { Line } from "app/svg-paths/components/svg/line";
import { Path } from "app/svg-paths/components/svg/path";
import { Circle } from "app/svg-paths/components/svg/circle";

const balloon = "M 6 10 C 6 8 4 10 4 5 S 11 0 11 5 S 9 8 9 10 Z";

const basket =
  "M 6.25 10 v 1.5 h -0.25 v 1 q 0 1 1 1 h 1 q 1 0 1 -1 v -1 h -3 m 2.75 0 v -1.5";

const curveIndices = [1, 2, 3];

const initialPoints: Array<[number, number]> = [
  [6, 8],
  [4, 10],
  [11, 0],
  [9, 8],
];

export const initialState = createInitialState(initialPoints);

function Chain() {
  const {
    data: { index, expanded },
  } = useStateContext("chain");
  const { data } = useStateContext("chainDrag");

  const [c0, c1, s1, s2] = data.points;
  const path = useEditablePath(balloon);
  const curves = path.commands.filter(
    (c) => c.code === "C" || c.code === "S"
  ) as Array<CommandWithCode<"C"> | CommandWithCode<"S">>;

  React.useEffect(() => {
    path.set<"C">(1, {
      x1: c0[0],
      y1: c0[1],
      x2: c1[0],
      y2: c1[1],
    });
    path.set<"S">(2, {
      x2: s1[0],
      y2: s1[1],
    });
    path.set<"S">(3, {
      x2: s2[0],
      y2: s2[1],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.points]);

  const isHovering = curveIndices.includes(index);
  const firstReflection = getReflection(4, 5, ...c1);
  const secondReflection = getReflection(11, 5, ...s1);
  return (
    <g>
      <motion.g
        animate={{ opacity: isHovering ? 0.2 : 1 }}
        transition={{ type: false }}
      >
        <Line x1="6" y1="10" x2={c0[0]} y2={c0[1]} />
        <Line x1="4" y1="5" x2={c1[0]} y2={c1[1]} />
        <Line x1="11" y1="5" x2={s1[0]} y2={s1[1]} />
        <Line x1="9" y1="10" x2={s2[0]} y2={s2[1]} />
        <Line
          dashed
          x1={c1[0]}
          y1={c1[1]}
          x2={firstReflection.x1}
          y2={firstReflection.y1}
        />
        <Line
          dashed
          x1={s1[0]}
          y1={s1[1]}
          x2={secondReflection.x1}
          y2={secondReflection.y1}
        />
        <Circle cx={firstReflection.x1} cy={firstReflection.y1} />
        <Circle cx={secondReflection.x1} cy={secondReflection.y1} />
        <Path d={path.toPathString()} />
        <Path animate={{ opacity: expanded ? 1 : 0.2 }} d={basket} />
        <g>
          {curves.map((command, index) => {
            const { x0, y0, x, y } = command;
            const last = index === curves.length - 1;
            return (
              <g key={command.id}>
                <Circle cx={x0} cy={y0} variant="cursor" size="large" />
                {last && <Circle cx={x} cy={y} variant="cursor" size="large" />}
              </g>
            );
          })}
        </g>
        <DragGroup source="chainDrag" />
      </motion.g>
      {isHovering && (
        <g>
          <Curve commands={path.commands} index={index} />
          <Path d={getPath(path.commands, index)} />
          <Circle
            variant="cursor"
            size="large"
            cx={path.commands[index].x0}
            cy={path.commands[index].y0}
          />
          <Circle
            variant="cursor"
            size="large"
            cx={path.commands[index].x}
            cy={path.commands[index].y}
          />
        </g>
      )}
    </g>
  );
}

function getPath(commands: Command[], index: number) {
  const command = commands[index];
  if (command.code !== "C" && command.code !== "S") return null;
  if (command.code === "C") {
    return `M ${command.x0} ${command.y0} C ${command.x1} ${command.y1} ${command.x2} ${command.y2} ${command.x} ${command.y}`;
  }
  const lastCommand = commands.at(index - 1);
  if (lastCommand.code !== "C" && lastCommand.code !== "S") return null;
  const { x1, y1 } = getReflection(
    command.x0,
    command.y0,
    lastCommand.x2,
    lastCommand.y2
  );
  return `M ${command.x0} ${command.y0} C ${x1} ${y1} ${command.x2} ${command.y2} ${command.x} ${command.y}`;
}

function Curve({ commands, index }: { commands: Command[]; index: number }) {
  const command = commands[index];
  if (command.code !== "C" && command.code !== "S") return null;
  if (command.code === "C")
    return <CurveCommand key={command.id} command={command} />;
  const lastCommand = commands.at(index - 1);
  if (lastCommand.code !== "C" && lastCommand.code !== "S") return null;
  return (
    <ShortcutCommand
      key={command.id}
      command={command}
      lastCommand={lastCommand}
    />
  );
}

function getReflection(x: number, y: number, x2: number, y2: number) {
  const dx = x - x2;
  const dy = y - y2;
  return {
    x1: x + dx,
    y1: y + dy,
  };
}

function ShortcutCommand({
  command,
  lastCommand,
}: {
  command: CommandWithCode<"S">;
  lastCommand: CommandWithCode<"C"> | CommandWithCode<"S">;
}) {
  const { x2, y2, x, y, x0, y0 } = command;
  const { x1, y1 } = getReflection(
    command.x0,
    command.y0,
    lastCommand.x2,
    lastCommand.y2
  );
  return (
    <g key={command.id}>
      <Line x1={x} y1={y} x2={x2} y2={y2} />
      <Line dashed x1={x0} y1={y0} x2={x1} y2={y1} />
      <Circle cx={x1} cy={y1} />
      <Circle variant="point" cx={x2} cy={y2} />
    </g>
  );
}

function CurveCommand({ command }: { command: CommandWithCode<"C"> }) {
  const { x, y, x1, y1, x2, y2, x0, y0 } = command;
  return (
    <g key={command.id}>
      <Line x1={x} y1={y} x2={x2} y2={y2} />
      <Line x1={x0} y1={y0} x2={x1} y2={y1} />
      <Circle variant="point" cx={x1} cy={y1} />
      <Circle variant="point" cx={x2} cy={y2} />
    </g>
  );
}

export const page = {
  children: <Chain />,
  svg: 15,
};

import React from "react";
import { motion } from "framer-motion";
import { useStateContext } from "app/svg-paths/components/state-context";
import { Svg } from "app/svg-paths/components/svg";
import { Command, parsePath } from "app/svg-paths/lib/path";
import { createInitialState } from "./drag-group";
import { ArcSandbox } from "./arc-sandbox";
import { SyntaxState } from "./types";

const path = parsePath("M 3 10 A 10 7.5 30 0 0 20 15");

function ArcSyntax() {
  const {
    data: { path, state, active },
    set,
  } = useStateContext<SyntaxState>("syntax");
  return <ArcSandbox path={path} state={state} active={active} set={set} />;
}

export const initialState = {
  ...createInitialState(),
  index: null,
  expanded: false,
  path,
};

function CommandView() {
  const {
    data: { path },
    set,
  } = useStateContext<SyntaxState>("syntax");
  const arc = path.at<"A">(1);
  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
      <ul className="flex gap-4 font-mono py-2 px-5 bg-gray3 rounded-lg text-lg border border-gray8 shadow-lg">
        <li className="py-2">
          <p>A</p>
        </li>
        <li>
          <PropButton prop="rx">{arc.rx.toFixed(1)}</PropButton>
        </li>
        <li>
          <PropButton prop="ry">{arc.ry.toFixed(1)}</PropButton>
        </li>
        <li>
          <PropButton prop="xAxisRotation">
            {arc.xAxisRotation.toFixed(1)}
          </PropButton>
        </li>
        <li>
          <PropButton
            prop="largeArc"
            onClick={() => {
              set({
                path: path.set(1, { largeArc: !arc.largeArc }),
                active: null,
              });
            }}
          >
            {arc.largeArc ? 1 : 0}
          </PropButton>
        </li>
        <li>
          <PropButton
            prop="sweep"
            onClick={() => {
              set({ path: path.set(1, { sweep: !arc.sweep }), active: null });
            }}
          >
            {arc.sweep ? 1 : 0}
          </PropButton>
        </li>
        <li>
          <PropButton prop="x">{arc.x.toFixed(1)}</PropButton>
        </li>
        <li>
          <PropButton prop="y">{arc.y.toFixed(1)}</PropButton>
        </li>
      </ul>
    </div>
  );
}

function PropButton({
  prop,
  children,
  onClick,
}: {
  prop: keyof Command<"A">;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const {
    data: { state },
    set,
  } = useStateContext<SyntaxState>("syntax");
  const toKey = (prop: keyof Command<"A">) => `1.${prop}`;
  return (
    <motion.button
      className="py-2 -mx-3 px-3 hover:bg-gray6 rounded-md"
      onHoverStart={() => state === "idle" && set({ active: [toKey(prop)] })}
      onHoverEnd={() => state === "idle" && set({ active: null })}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export const page = {
  children: (
    <>
      <Svg>
        <ArcSyntax />
      </Svg>
      <CommandView />
    </>
  ),
};

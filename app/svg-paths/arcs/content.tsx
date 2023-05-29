"use client";

import React from "react";
import { MDX } from "../components/mdx";
import { StateProvider, useStateContext } from "../components/state-context";
import { ActiveComponent, VisualWrapper } from "../components/visual-wrapper";
import * as syntax from "./content/syntax";
import * as ellipse from "./content/ellipse";
import * as smallEllipse from "./content/small-ellipse";
import * as rotation from "./content/rotation";
import * as flags from "./content/flags";
import { CommandListFromSource, CommandText } from "./command-list";
import type { Path } from "app/svg-paths/lib/path";
import { Button } from "../components/button";
import { animate } from "popmotion";
import { Slider } from "./slider";

export function Content({ content, length }) {
  return (
    <StateProvider
      initial={{
        syntax: syntax.initialState,
        ellipse: ellipse.initialState,
        "small-ellipse": smallEllipse.initialState,
        rotation: rotation.initialState,
        flags: flags.initialState,
      }}
    >
      <MDX
        content={content}
        numSections={length}
        components={{
          CommandListFromSource,
          ShrinkArcButton,
          ToggleFlagButton,
          RotationSlider,
        }}
      >
        <ActiveComponent components={[syntax.page]} />
        <VisualWrapper
          components={[
            null,
            ellipse.page,
            smallEllipse.page,
            rotation.page,
            flags.page,
            flags.page,
            flags.page,
            flags.page,
          ]}
        />
      </MDX>
    </StateProvider>
  );
}

function RotationSlider() {
  const {
    data: { path },
    set,
  } = useStateContext<{ path: Path }>("rotation");
  const arc = path.atAbsolute<"A">(1);
  return (
    <Slider
      value={[arc.xAxisRotation]}
      onValueChange={([rotation]) => {
        set({ path: path.set(1, { xAxisRotation: rotation }) });
      }}
      step={0.5}
    />
  );
}

function ToggleFlagButton() {
  const {
    data: { path },
    set,
  } = useStateContext<{ path: Path }>("flags");
  return (
    <div className="flex justify-between gap-2">
      <div className="bg-gray1 py-2 px-3 border border-gray8 rounded-md w-full relative">
        <code className="flex gap-[1ch]">
          <span>A</span>
          <CommandText command={path.at(1)} index={1} active={["1.sweep"]} />
        </code>
      </div>
      <Button
        className="shrink-0"
        onClick={() => {
          set({
            path: path.set(1, { sweep: !path.atAbsolute<"A">(1).sweep }),
          });
        }}
      >
        Toggle
      </Button>
    </div>
  );
}

function ShrinkArcButton() {
  const {
    data: { path },
    set,
  } = useStateContext<{ path: Path }>("small-ellipse");
  return (
    <div className="flex justify-between gap-2">
      <div className="bg-gray1 py-2 px-3 border border-gray8 rounded-md w-full relative">
        <code className="flex gap-[1ch]">
          <span>A</span>
          <CommandText command={path.at(1)} index={1} active={["1.rx"]} />
        </code>
        <button
          className="absolute right-1 top-1 bottom-1 p-1 rounded-md flex items-center hover:bg-gray6"
          onClick={() => {
            set({ path: path.set(1, { rx: 10 }) });
          }}
        >
          <Undo />
        </button>
      </div>
      <Button
        className="shrink-0"
        onClick={() => {
          animate({
            from: 10,
            to: 6.5,
            type: "spring",
            duration: 3000,
            onUpdate: (rx) => {
              set({ path: path.set(1, { rx }) });
            },
          });
        }}
      >
        Shrink Arc
      </Button>
    </div>
  );
}

const Undo = () => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M9.25 4.75L4.75 9L9.25 13.25" />
        <path d="M5.5 9H15.25C17.4591 9 19.25 10.7909 19.25 13V19.25" />
      </g>
    </svg>
  );
};

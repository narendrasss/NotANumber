import React from "react";
import { motion } from "framer-motion";
import { useSvgContext } from "../svg";

type LineVariant = "primary" | "secondary" | "highlight";

export function Line({
  variant = "primary",
  dashed = false,
  ...props
}: {
  variant?: LineVariant;
  dashed?: boolean;
} & React.ComponentPropsWithoutRef<(typeof motion)["line"]>) {
  const { useRelativeMotionValue } = useSvgContext();
  const dashedValue = useRelativeMotionValue(1);
  const mapVariantToStroke = {
    primary: "stroke-gray10",
    secondary: "stroke-gray8",
    highlight: "stroke-blue9",
  };
  return (
    <motion.line
      className={mapVariantToStroke[variant]}
      strokeWidth={useRelativeMotionValue(0.5)}
      strokeDasharray={dashed && dashedValue}
      {...props}
    />
  );
}

import { styled } from "~/stitches.config";
import { range } from "~/lib/utils";

const CELL_SIZE = 8;

export const Grid: React.FC<{
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
}> = ({
  rows = 10,
  cols = 15,
  cellSize = CELL_SIZE,
  className = "",
  children,
}) => {
  const xMax = cols * cellSize;
  const yMax = rows * cellSize;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${xMax} ${yMax}`}
      preserveAspectRatio="none"
      className={className}
    >
      <Wrapper>
        {range(rows)
          .slice(1)
          .map((index) => (
            <line
              key={`row-${index}`}
              x1="0"
              x2={xMax}
              y1={index * cellSize}
              y2={index * cellSize}
              stroke="currentColor"
              strokeWidth="0.2"
            />
          ))}
        {range(cols)
          .slice(1)
          .map((index) => (
            <line
              key={`col-${index}`}
              x1={index * cellSize}
              x2={index * cellSize}
              y1="0"
              y2={yMax}
              stroke="currentColor"
              strokeWidth="0.2"
            />
          ))}
      </Wrapper>
      {children}
    </svg>
  );
};

const Wrapper = styled("g", {
  color: "$gray8",
});

export const GridBackground: React.FC<{ rows?: number; cols?: number }> = ({
  children,
  rows,
  cols,
}) => (
  <GridBackgroundWrapper>
    <GridWrapper rows={rows} cols={cols} />
    {children}
  </GridBackgroundWrapper>
);

const GridWrapper = styled(Grid, {
  position: "absolute",
  inset: "0",
});

const GridBackgroundWrapper = styled("div", {
  positon: "relative",
  border: "1px solid $gray8",
});
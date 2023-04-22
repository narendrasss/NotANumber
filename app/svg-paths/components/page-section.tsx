import React from "react";
import { useIndexContext } from "./index-provider";

export function PageSection({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { set } = useIndexContext();

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        if (top < window.innerHeight / 2) {
          set(index);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [index, set]);

  return (
    <section
      ref={ref}
      className="p-10 pb-32 min-h-[50vh] space-y-[1.5em] relative before:h-px before:border-gray8 before:border-t before:border-dashed before:absolute before:right-0 before:top-0 before:w-1/4 first-of-type:before:hidden"
    >
      {children}
    </section>
  );
}

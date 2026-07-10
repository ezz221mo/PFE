import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 30, stiffness: 900, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 900, mass: 0.3 });

  const ringX = useSpring(cursorX, { damping: 22, stiffness: 280, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 280, mass: 0.6 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none">
      <motion.div
        className="fixed top-0 left-0 z-[200] rounded-full bg-primary pointer-events-none"
        style={{
          translateX: dotX,
          translateY: dotY,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[199] rounded-full border border-foreground/60 pointer-events-none"
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          marginLeft: isHovering ? -24 : -16,
          marginTop: isHovering ? -24 : -16,
          borderColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.5)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

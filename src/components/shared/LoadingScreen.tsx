import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const calledRef = useRef(false);
  const DURATION = 1600;

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, DURATION);
      const linear = elapsed / DURATION;
      const eased = linear < 0.5
        ? 2 * linear * linear
        : 1 - Math.pow(-2 * linear + 2, 2) / 2;

      setProgress(Math.round(eased * 100));

      if (elapsed < DURATION) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        if (!calledRef.current) {
          calledRef.current = true;
          setTimeout(onComplete, 320);
        }
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onComplete]);

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: "-4%",
        transition: { duration: 0.65, ease: EASE },
      }}
      className="fixed inset-0 z-[300] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
        }}
      />

      <div className="flex flex-col items-center gap-0 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="font-mono text-[9px] uppercase tracking-[0.5em] text-primary mb-10 text-center"
        >
          Frontend Developer
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="font-serif text-[14vw] sm:text-[10vw] md:text-[8vw] leading-none tracking-tighter text-foreground select-none">
            Ezzaldin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="font-serif text-[14vw] sm:text-[10vw] md:text-[8vw] leading-none tracking-tighter italic font-light text-muted-foreground select-none pl-[3vw]">
            Elsadat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 w-64 sm:w-80 flex flex-col gap-3"
        >
          <div className="relative h-px w-full bg-border/30 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary origin-left"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/30">
              Loading
            </span>
            <span className="font-mono text-[9px] tracking-widest text-muted-foreground/50 tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.4em] text-muted-foreground/20"
      >
        {new Date().getFullYear()} &mdash; Zodex
      </motion.div>
    </motion.div>
  );
}

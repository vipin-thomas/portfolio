// src/components/TaglineCloud.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BIG_TAGLINES = [
  "CI/CD • Automation • Observability",
  "Docker · Kubernetes · Terraform",
  "Performance • Reliability • Security",
];

const CLOUD_WORDS = [
  "Linux", "GitHub Actions", "Jenkins", "Docker", "K8s", "React",
  "Terraform", "Ansible", "NGINX", "AWS", "EC2", "EKS",
  "Grafana", "Prometheus", "Node.js", "MongoDB", "DynamoDB", "MySQL",
];

export default function TaglineCloud() {
  // rotate the big tagline every few seconds
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % BIG_TAGLINES.length), 2400);
    return () => clearInterval(t);
  }, []);

  // Precompute random positions + float speeds for the cloud words
  const floats = useMemo(() => {
    return CLOUD_WORDS.map((w, i) => ({
      word: w,
      // keep words within a central band (so they don't collide with header/footer)
      top: 20 + (i * 37) % 45,     // 20%..65%
      left: 10 + (i * 23) % 80,    // 10%..90%
      dur: 3 + ((i * 7) % 40) / 10 // 3.0 .. 6.0 seconds
    }));
  }, []);

  return (
    <section
      aria-label="Dynamic tagline cloud"
      className="relative mx-auto max-w-6xl h-[38vh] md:h-[46vh] w-full"
    >
      {/* Floating keyword chips */}
      <div className="absolute inset-0 select-none">
        {floats.map(({ word, top, left, dur }, i) => (
          <motion.span
            key={word}
            className="absolute px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs md:text-sm
                       backdrop-blur-sm border border-white/10 hover:border-white/30 hover:text-white
                       hover:bg-white/15 transition-colors"
            style={{ top: `${top}%`, left: `${left}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [-6, 6, -6], opacity: 1 }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Central rotating tagline */}
      <div className="absolute inset-0 grid place-items-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={idx}
            className="text-center text-2xl md:text-4xl font-semibold tracking-tight
                       text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
            transition={{ duration: 0.45 }}
          >
            {BIG_TAGLINES[idx]}
          </motion.h2>
        </AnimatePresence>

        {/* subtle glow ring behind text */}
        <div className="pointer-events-none absolute w-64 h-64 md:w-96 md:h-96 rounded-full
                        bg-cyan-400/10 blur-3xl" />
      </div>
    </section>
  );
}

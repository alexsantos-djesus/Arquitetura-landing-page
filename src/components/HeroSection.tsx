import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ArchitectureScene from "./ArchitectureScene";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.section ref={ref} style={{ opacity, scale }} className="relative h-screen flex items-center justify-center overflow-hidden">
      <ArchitectureScene />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

      <motion.div style={{ y }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glow-line w-24 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase font-body mb-4"
        >
          Atelier de Arquitetura
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-foreground leading-[0.9]"
        >
          <span className="block">ESPAÇOS</span>
          <span className="block text-gradient-accent">QUE INSPIRAM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 text-muted-foreground max-w-md mx-auto text-sm md:text-base font-body leading-relaxed"
        >
          Projetando o futuro através de formas, luz e matéria.
          Cada espaço, uma narrativa única.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12"
        >
          <a href="#projects" data-cursor-hover className="glass-panel px-8 py-3 text-sm tracking-[0.2em] uppercase text-foreground hover:bg-primary/10 transition-colors duration-500 inline-block">
            Explorar Projetos
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;

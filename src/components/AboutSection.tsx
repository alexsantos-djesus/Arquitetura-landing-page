import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projetos" },
  { value: "23", label: "Países" },
  { value: "18", label: "Prêmios" },
  { value: "2006", label: "Fundação" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="sobre" ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Large background text */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none"
      >
        <span className="font-display text-[15vw] font-bold text-muted/30 whitespace-nowrap">
          ARQUITETURA
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-xs tracking-[0.4em] uppercase"
            >
              Sobre o Atelier
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mt-4 mb-8 text-foreground"
            >
              Construindo o<br />
              <span className="text-gradient-accent">Impossível</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed mb-6"
            >
              Somos um atelier de arquitetura contemporânea dedicado a transformar
              visões ousadas em realidade construída. Cada projeto é uma exploração
              de forma, função e emoção.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground leading-relaxed"
            >
              Nossa abordagem paramétrica combina tecnologia de ponta com sensibilidade
              artística, criando espaços que dialogam com o futuro enquanto respeitam
              o contexto.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="glass-panel p-6 md:p-8 text-center"
              >
                <span className="font-display text-3xl md:text-4xl font-bold text-gradient-accent block">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

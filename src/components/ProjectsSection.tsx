import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Torre Helicoidal",
    category: "Comercial",
    year: "2024",
    description: "Um arranha-céu que desafia a gravidade com sua estrutura helicoidal em vidro e aço.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    id: 2,
    title: "Pavilhão Fluido",
    category: "Cultural",
    year: "2023",
    description: "Espaço expositivo com geometria paramétrica inspirada em formas orgânicas.",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&q=80",
  },
  {
    id: 3,
    title: "Residência Monolito",
    category: "Residencial",
    year: "2024",
    description: "Casa-escultura em concreto aparente com integração total à paisagem.",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&q=80",
  },
  {
    id: 4,
    title: "Campus Nexus",
    category: "Institucional",
    year: "2023",
    description: "Centro de inovação com pátios flutuantes e fachadas cinéticas.",
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&q=80",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      <motion.div
        className="relative w-full md:w-3/5 aspect-[4/3] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor-hover
      >
        <motion.img
          style={{ scale: imgScale }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-foreground glass-panel px-6 py-3">
            Ver Projeto
          </span>
        </motion.div>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
      </motion.div>

      <div className="w-full md:w-2/5 space-y-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-xs tracking-[0.3em] uppercase font-body"
        >
          {project.category} — {project.year}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground"
        >
          {project.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {project.description}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glow-line w-16 origin-left"
        />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" ref={ref} className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-32"
        >
          <span className="text-primary text-xs tracking-[0.4em] uppercase">Portfólio</span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mt-4 text-foreground">
            Projetos<br />
            <span className="text-gradient">Selecionados</span>
          </h2>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

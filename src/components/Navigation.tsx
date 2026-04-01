import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const Navigation = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-colors duration-500 ${scrolled ? "glass-panel" : ""}`}
    >
      <a href="#" className="font-display text-lg font-bold tracking-wider text-foreground" data-cursor-hover>
        ARQSTUDIO
      </a>

      <div className="flex items-center gap-8">
        {["Projetos", "Sobre", "Contato"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            data-cursor-hover
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 hidden md:block"
          >
            {item}
          </a>
        ))}
        <div className="w-6 h-4 flex flex-col justify-between md:hidden" data-cursor-hover>
          <span className="block w-full h-px bg-foreground" />
          <span className="block w-4 h-px bg-foreground ml-auto" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

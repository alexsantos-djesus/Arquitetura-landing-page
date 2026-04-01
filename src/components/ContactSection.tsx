import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contato" className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="glow-line w-24 mx-auto mb-8"
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Vamos criar<br />
          <span className="text-gradient-accent">juntos</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-lg mx-auto mb-12"
        >
          Cada grande projeto começa com uma conversa.
          Estamos prontos para transformar sua visão em realidade.
        </motion.p>

        <motion.a
          href="mailto:contato@arqstudio.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          data-cursor-hover
          className="glass-panel px-10 py-4 text-sm tracking-[0.2em] uppercase text-foreground hover:bg-primary/10 transition-colors duration-500 inline-block"
        >
          Iniciar Projeto
        </motion.a>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-muted-foreground text-xs">
            Desenvolvido por{" "}
            <a href="https://www.instagram.com/debuguei" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-primary hover:text-primary/80 transition-colors font-medium">
              Debuguei
            </a>
          </span>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/debuguei" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-muted-foreground text-xs hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/alex-santos-97977b29b/" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-muted-foreground text-xs hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

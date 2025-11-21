import { motion } from "framer-motion";
import { Youtube, Instagram, MessageCircle, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/socialLinks";

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-accent animate-glow" />
            <p className="font-display text-xl text-secondary">
              Conecta con tu luz interior
            </p>
            <Sparkles className="w-5 h-5 text-accent animate-glow" />
          </div>

          <div className="flex items-center justify-center gap-6">
            <motion.a
              href={SOCIAL_LINKS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-secondary hover:text-accent transition-colors"
              aria-label={SOCIAL_LINKS.youtube.ariaLabel}
            >
              <Youtube className="w-6 h-6" />
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-secondary hover:text-accent transition-colors"
              aria-label={SOCIAL_LINKS.instagram.ariaLabel}
            >
              <Instagram className="w-6 h-6" />
            </motion.a>

            <motion.a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-secondary hover:text-accent transition-colors"
              aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>
          </div>

          <div className="text-sm text-muted-foreground font-body">
            <p>© 2025 Tarot Madrid. Todos los derechos reservados.</p>
            <p className="mt-2">Lecturas evolutivas y sanación energética</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

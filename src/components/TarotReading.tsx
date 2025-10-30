import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import tarotCardBack from "@/assets/tarot-card-back.png";
import legacySun from "@/assets/legacy-sun.png";
import legacyMoon from "@/assets/legacy-moon.png";
import legacyMagician from "@/assets/legacy-magician.png";
import legacyJustice from "@/assets/legacy-justice.png";
import legacyLovers from "@/assets/legacy-lovers.png";
import legacyStar from "@/assets/legacy-star.png";
import legacyTower from "@/assets/legacy-tower.png";
import legacyStrength from "@/assets/legacy-strength.png";
import legacyWheel from "@/assets/legacy-wheel.png";

interface TarotCard {
  id: string;
  name: string;
  interpretation: string;
  imageUrl: string;
}

const tarotDeck: TarotCard[] = [
  { id: "sun", name: "El Sol", interpretation: "Claridad y éxito iluminan tu camino. Se abren nuevas oportunidades.", imageUrl: legacySun },
  { id: "moon", name: "La Luna", interpretation: "Tu intuición despierta. Escucha los mensajes del inconsciente.", imageUrl: legacyMoon },
  { id: "magician", name: "El Mago", interpretation: "Tu poder interior crea realidades. Actúa con intención.", imageUrl: legacyMagician },
  { id: "justice", name: "La Justicia", interpretation: "Equilibrio y verdad llegan a tu vida. Lo justo prevalece.", imageUrl: legacyJustice },
  { id: "lovers", name: "Los Enamorados", interpretation: "Una decisión del corazón marcará tu destino.", imageUrl: legacyLovers },
  { id: "star", name: "La Estrella", interpretation: "Esperanza renovada. Confía en que el universo conspira a tu favor.", imageUrl: legacyStar },
  { id: "tower", name: "La Torre", interpretation: "Transformación inevitable. Lo viejo se derrumba para dar paso a lo nuevo.", imageUrl: legacyTower },
  { id: "strength", name: "La Fuerza", interpretation: "Tu fortaleza interior te guía. La compasión es tu mayor poder.", imageUrl: legacyStrength },
  { id: "wheel", name: "La Rueda de la Fortuna", interpretation: "Los ciclos giran a tu favor. Acepta el cambio con gratitud.", imageUrl: legacyWheel },
];

const TarotReading = () => {
  const [selectedTheme, setSelectedTheme] = useState<"love" | "money" | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleThemeSelect = (theme: "love" | "money") => {
    setSelectedTheme(theme);
    setIsShuffling(true);
    setSelectedCards([]);
    setRevealedCards([]);
    setShowResult(false);

    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };

  const handleCardSelect = (index: number) => {
    if (selectedCards.includes(index) || selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    // Reveal card
    const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
    setRevealedCards([...revealedCards, randomCard]);

    if (newSelected.length === 3) {
      setTimeout(() => setShowResult(true), 1000);
    }
  };

  const resetReading = () => {
    setSelectedTheme(null);
    setSelectedCards([]);
    setRevealedCards([]);
    setShowResult(false);
  };

  return (
    <section id="tarot-reading" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Tu Tirada Gratuita
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Elige tu consulta y descubre lo que el universo revela
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedTheme ? (
            <motion.div
              key="theme-selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <Card
                className="p-8 cursor-pointer hover:shadow-[var(--glow-purple)] transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur border-border/50"
                onClick={() => handleThemeSelect("love")}
              >
                <Heart className="w-16 h-16 mx-auto mb-4 text-secondary animate-float" />
                <h3 className="font-display text-2xl font-bold text-secondary mb-2">Amor 💕</h3>
                <p className="text-muted-foreground font-body">
                  Descubre los secretos de tu corazón y las energías del amor
                </p>
              </Card>

              <Card
                className="p-8 cursor-pointer hover:shadow-[var(--glow-gold)] transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur border-border/50"
                onClick={() => handleThemeSelect("money")}
              >
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-accent animate-float" />
                <h3 className="font-display text-2xl font-bold text-accent mb-2">Dinero 💰</h3>
                <p className="text-muted-foreground font-body">
                  Explora las oportunidades y el flujo de la abundancia
                </p>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="card-reading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              {isShuffling ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Sparkles className="w-16 h-16 text-accent" />
                  </motion.div>
                  <p className="text-xl text-secondary mt-4 font-body">Barajando las cartas...</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-12">
                    <p className="text-lg text-secondary font-body">
                      {selectedCards.length < 3
                        ? `Selecciona ${3 - selectedCards.length} carta${3 - selectedCards.length > 1 ? "s" : ""} más`
                        : "Lectura completa"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mb-12">
                    {[...Array(7)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50, rotateY: -180 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateY: selectedCards.includes(i) ? 180 : 0,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedCards.includes(i) ? "scale-110" : "hover:scale-105"
                        }`}
                        onClick={() => handleCardSelect(i)}
                        style={{ perspective: 1000 }}
                      >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                          {!selectedCards.includes(i) ? (
                            <img
                              src={tarotCardBack}
                              alt="Tarot card back"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-background to-background/50 flex items-center justify-center p-1 animate-glow">
                              <img
                                src={revealedCards[selectedCards.indexOf(i)]?.imageUrl}
                                alt={revealedCards[selectedCards.indexOf(i)]?.name}
                                className="w-full h-full object-cover rounded-md"
                                style={{
                                  boxShadow: "0 0 30px rgba(255, 215, 128, 0.5)",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-3xl font-bold text-accent text-center mb-8">
                        Tu Lectura
                      </h3>
                      
                      {revealedCards.map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                        >
                          <Card className="p-6 bg-card/50 backdrop-blur border-accent/20">
                            <div className="flex items-start gap-6">
                              <div className="flex-shrink-0">
                                <img
                                  src={card.imageUrl}
                                  alt={card.name}
                                  className="w-24 h-36 object-cover rounded-lg shadow-lg"
                                  style={{
                                    boxShadow: "0 0 20px rgba(255, 215, 128, 0.4)",
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-display text-xl font-bold text-secondary mb-2">
                                  {card.name}
                                </h4>
                                <p className="text-muted-foreground font-body">{card.interpretation}</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}

                      <div className="text-center pt-8 space-y-4">
                        <Button
                          onClick={resetReading}
                          variant="outline"
                          className="mr-4 border-secondary text-secondary hover:bg-secondary/10"
                        >
                          Nueva tirada
                        </Button>
                        <Button
                          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                          className="bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[var(--glow-gold)]"
                        >
                          <Sparkles className="mr-2 w-4 h-4" />
                          Reserva tu lectura completa
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TarotReading;

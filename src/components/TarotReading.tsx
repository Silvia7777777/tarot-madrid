import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Sparkles } from "lucide-react";
import amethystHeart from "@/assets/amethyst-heart.png";
import whiteQuartz from "@/assets/white-quartz.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FloatingCardsDecor from "@/components/FloatingCardsDecor";
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
  interpretations: {
    love: string;
    money: string;
    general: string;
  };
  imageUrl: string;
}

const tarotDeck: TarotCard[] = [
  { 
    id: "sun", 
    name: "El Sol", 
    interpretations: {
      love: "Esa persona especial ilumina tu vida con alegría genuina. La relación florece bajo la luz de la autenticidad. Es momento de expresar tus sentimientos con claridad y confianza.",
      money: "El éxito profesional brilla en tu horizonte. Tus proyectos reciben reconocimiento y abundancia. Tu talento se hace visible en el ámbito laboral y las oportunidades florecen.",
      general: "Claridad y éxito iluminan tu camino. Se abren nuevas oportunidades."
    },
    imageUrl: legacySun 
  },
  { 
    id: "moon", 
    name: "La Luna", 
    interpretations: {
      love: "Esa persona despierta emociones profundas en ti. Hay misterios por descubrir en esta conexión. Confía en tu intuición para navegar las aguas del amor.",
      money: "Tu intuición es tu mejor guía en decisiones financieras. Presta atención a las oportunidades que surgen en la penumbra. La paciencia revelará el camino correcto.",
      general: "Tu intuición despierta. Escucha los mensajes del inconsciente."
    },
    imageUrl: legacyMoon 
  },
  { 
    id: "magician", 
    name: "El Mago", 
    interpretations: {
      love: "Tienes el poder de manifestar el amor que deseas con esa persona. Tu carisma y claridad de intención atraen lo que buscas. Es tiempo de actuar con confianza.",
      money: "Posees todas las herramientas para el éxito económico. Tu habilidad para materializar ideas te lleva a la prosperidad. El momento de emprender es ahora.",
      general: "Tu poder interior crea realidades. Actúa con intención."
    },
    imageUrl: legacyMagician 
  },
  { 
    id: "justice", 
    name: "La Justicia", 
    interpretations: {
      love: "Esa relación se basa en el equilibrio y la reciprocidad. Ambos dan y reciben en justa medida. Las decisiones honestas fortalecen el vínculo.",
      money: "Tus esfuerzos laborales serán recompensados justamente. Los contratos y acuerdos están a tu favor. La transparencia en los negocios trae abundancia.",
      general: "Equilibrio y verdad llegan a tu vida. Lo justo prevalece."
    },
    imageUrl: legacyJustice 
  },
  { 
    id: "lovers", 
    name: "Los Enamorados", 
    interpretations: {
      love: "Una decisión importante sobre esa persona especial está en tus manos. El corazón y la mente deben alinearse. Esta elección definirá el rumbo de tu vida amorosa.",
      money: "Debes elegir entre dos caminos profesionales igualmente atractivos. Evalúa qué opción se alinea con tus valores. La decisión correcta traerá satisfacción y estabilidad.",
      general: "Una decisión del corazón marcará tu destino."
    },
    imageUrl: legacyLovers 
  },
  { 
    id: "star", 
    name: "La Estrella", 
    interpretations: {
      love: "Esa persona representa la esperanza renovada en tu vida amorosa. Después de tiempos difíciles, llega la claridad. Confía en que el universo conspira para unirlos.",
      money: "Nuevas oportunidades laborales aparecen en el horizonte. Tu fe en ti mismo atrae la abundancia. Los proyectos a largo plazo prometen gran éxito.",
      general: "Esperanza renovada. Confía en que el universo conspira a tu favor."
    },
    imageUrl: legacyStar 
  },
  { 
    id: "tower", 
    name: "La Torre", 
    interpretations: {
      love: "Una revelación sobre esa persona transformará tu perspectiva. Lo que parecía sólido necesita reconstruirse. Esta crisis abre paso a una conexión más auténtica.",
      money: "Los cambios repentinos en tu situación laboral traen oportunidades ocultas. Las viejas estructuras profesionales se derrumban para algo mejor. Abraza la transformación.",
      general: "Transformación inevitable. Lo viejo se derrumba para dar paso a lo nuevo."
    },
    imageUrl: legacyTower 
  },
  { 
    id: "strength", 
    name: "La Fuerza", 
    interpretations: {
      love: "Tu paciencia y compasión conquistarán el corazón de esa persona. El amor verdadero requiere fortaleza interior y ternura. La conexión se profundiza con cada acto de comprensión.",
      money: "Tu perseverancia supera cualquier obstáculo económico. El trabajo duro y la disciplina rinden frutos. Tu capacidad de mantener la calma atrae el éxito financiero.",
      general: "Tu fortaleza interior te guía. La compasión es tu mayor poder."
    },
    imageUrl: legacyStrength 
  },
  { 
    id: "wheel", 
    name: "La Rueda de la Fortuna", 
    interpretations: {
      love: "Los ciclos del destino giran a favor de tu relación con esa persona. Un cambio positivo se aproxima. Acepta los altibajos con gratitud y confianza.",
      money: "Las oportunidades financieras llegan en ciclos favorables. Tu situación económica está en ascenso. El universo recompensa tu paciencia con abundancia.",
      general: "Los ciclos giran a tu favor. Acepta el cambio con gratitud."
    },
    imageUrl: legacyWheel 
  },
];

const TarotReading = () => {
  const [selectedTheme, setSelectedTheme] = useState<"love" | "money" | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [preselectedCards, setPreselectedCards] = useState<TarotCard[]>([]);

  const handleThemeSelect = (theme: "love" | "money") => {
    setSelectedTheme(theme);
    setIsShuffling(true);
    setSelectedCards([]);
    setRevealedCards([]);
    setShowResult(false);

    // Barajar el mazo y seleccionar 3 cartas únicas
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const threeCards = shuffled.slice(0, 3);
    setPreselectedCards(threeCards);

    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };

  const handleCardSelect = (index: number) => {
    if (selectedCards.includes(index) || selectedCards.length >= 3) return;

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    // Revelar la carta correspondiente del array preseleccionado
    const cardToReveal = preselectedCards[newSelected.length - 1];
    setRevealedCards([...revealedCards, cardToReveal]);

    if (newSelected.length === 3) {
      setTimeout(() => setShowResult(true), 1000);
    }
  };

  const resetReading = () => {
    setSelectedTheme(null);
    setSelectedCards([]);
    setRevealedCards([]);
    setShowResult(false);
    setPreselectedCards([]);
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
                <div className="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <motion.img
                    src={amethystHeart}
                    alt="Amatista del Amor"
                    className="w-16 h-16 relative z-10"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Brillo pulsante morado */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(168, 85, 247, 0.4)",
                        "0 0 50px rgba(168, 85, 247, 0.7)",
                        "0 0 30px rgba(168, 85, 247, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Rayos de luz desde el centro */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-16 h-0.5 origin-left"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        background: "linear-gradient(90deg, rgba(168, 85, 247, 0.6) 0%, transparent 100%)",
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scaleX: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-2xl font-bold text-secondary mb-2">Amor 💕</h3>
                <p className="text-muted-foreground font-body mb-4">
                  Descubre los secretos de tu corazón y las energías del amor
                </p>
                <FloatingCardsDecor variant="love" size="small" spacing="none" />
              </Card>

              <Card
                className="p-8 cursor-pointer hover:shadow-[var(--glow-gold)] transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur border-border/50"
                onClick={() => handleThemeSelect("money")}
              >
                <div className="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                  <motion.img
                    src={whiteQuartz}
                    alt="Cuarzo de la Abundancia"
                    className="w-16 h-16 relative z-10"
                    animate={{
                      scale: [1, 1.08, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Brillo blanco-dorado */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)",
                        "0 0 50px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 215, 0, 0.5)",
                        "0 0 30px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Destellos de luz radial */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-25px)`,
                      }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 215, 0, 0.8) 100%)",
                          boxShadow: "0 0 10px rgba(255, 255, 255, 0.9)",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <h3 className="font-display text-2xl font-bold text-accent mb-2">Dinero 💰</h3>
                <p className="text-muted-foreground font-body mb-4">
                  Explora las oportunidades y el flujo de la abundancia
                </p>
                <FloatingCardsDecor variant="money" size="small" spacing="none" />
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
                                <p className="text-muted-foreground font-body">
                                  {selectedTheme === "love" 
                                    ? card.interpretations.love 
                                    : card.interpretations.money}
                                </p>
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

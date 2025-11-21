import legacySun from "@/assets/legacy-sun.png";
import legacyMoon from "@/assets/legacy-moon.png";
import legacyMagician from "@/assets/legacy-magician.png";
import legacyJustice from "@/assets/legacy-justice.png";
import legacyLovers from "@/assets/legacy-lovers.png";
import legacyStar from "@/assets/legacy-star.png";
import legacyTower from "@/assets/legacy-tower.png";
import legacyStrength from "@/assets/legacy-strength.png";
import legacyWheel from "@/assets/legacy-wheel.png";

/**
 * Tarot Deck Configuration
 * All tarot cards with their interpretations
 */

export interface TarotCard {
  id: string;
  name: string;
  interpretations: {
    love: string;
    money: string;
    general: string;
  };
  imageUrl: string;
}

export const TAROT_DECK: TarotCard[] = [
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

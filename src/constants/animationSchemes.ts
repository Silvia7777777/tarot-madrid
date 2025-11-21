/**
 * Animation Schemes Configuration
 * Color schemes and animation effects for FloatingCardsDecor
 */

export interface ColorScheme {
  filter: string;
  glow: string;
  glowPulse: string[];
}

export type AnimationVariant = "default" | "love" | "money" | "static";

export const ANIMATION_SCHEMES: Record<AnimationVariant, ColorScheme> = {
  default: {
    filter: "brightness(1.1) saturate(1.2)",
    glow: "0 0 20px rgba(255, 215, 128, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3)",
    glowPulse: [
      "0 0 10px rgba(255, 215, 128, 0.1)",
      "0 0 25px rgba(255, 215, 128, 0.3)",
      "0 0 10px rgba(255, 215, 128, 0.1)",
    ]
  },
  love: {
    filter: "sepia(1) saturate(3) hue-rotate(250deg) brightness(0.6)",
    glow: "0 0 20px rgba(168, 85, 247, 0.4), 0 5px 20px rgba(0, 0, 0, 0.3)",
    glowPulse: [
      "0 0 10px rgba(168, 85, 247, 0.2)",
      "0 0 25px rgba(168, 85, 247, 0.5)",
      "0 0 10px rgba(168, 85, 247, 0.2)",
    ]
  },
  money: {
    filter: "sepia(1) saturate(2) hue-rotate(30deg) brightness(1.3)",
    glow: "0 0 20px rgba(255, 215, 0, 0.4), 0 5px 20px rgba(0, 0, 0, 0.3)",
    glowPulse: [
      "0 0 10px rgba(255, 215, 0, 0.2)",
      "0 0 25px rgba(255, 215, 0, 0.5)",
      "0 0 10px rgba(255, 215, 0, 0.2)",
    ]
  },
  static: {
    filter: "brightness(1.1) saturate(1.2)",
    glow: "0 0 20px rgba(255, 215, 128, 0.2), 0 5px 20px rgba(0, 0, 0, 0.3)",
    glowPulse: [
      "0 0 10px rgba(255, 215, 128, 0.1)",
      "0 0 25px rgba(255, 215, 128, 0.3)",
      "0 0 10px rgba(255, 215, 128, 0.1)",
    ]
  }
};

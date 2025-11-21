import { useState } from "react";
import { TAROT_DECK, type TarotCard } from "@/constants/tarotDeck";

/**
 * Custom hook for Tarot reading logic
 */

export type ThemeType = "love" | "money" | null;

export const useTarotReading = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(null);
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

    // Shuffle deck and select 3 unique cards
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
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

    // Reveal corresponding card from preselected array
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

  return {
    selectedTheme,
    isShuffling,
    selectedCards,
    revealedCards,
    showResult,
    handleThemeSelect,
    handleCardSelect,
    resetReading,
  };
};

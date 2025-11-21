/**
 * Social Links Configuration
 * Centralized social media URLs and contact information
 */

export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS = {
  youtube: {
    name: "YouTube",
    url: "https://youtube.com/@Tarot_Madrid",
    ariaLabel: "YouTube",
  },
  instagram: {
    name: "Instagram",
    url: "https://instagram.com/tarot_madrid",
    ariaLabel: "Instagram",
  },
  whatsapp: {
    name: "WhatsApp",
    url: "https://wa.me/34XXXXXXXXX",
    ariaLabel: "WhatsApp",
  },
} as const;

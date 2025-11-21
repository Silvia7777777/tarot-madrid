/**
 * Stripe Configuration
 * Centralized Stripe pricing configuration
 */

export const STRIPE_PRICES = {
  '30-min': 'price_1SSOCaJSj0tadVn0E97PdmWC',
  '50-min': 'price_1SSOEpJSj0tadVn0MVe31wCy',
} as const;

export type SessionTypeId = keyof typeof STRIPE_PRICES;

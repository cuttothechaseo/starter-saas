import Stripe from 'stripe';

import { getEnvVar } from '@/utils/get-env-var';

// Update the app name to match your project
const APP_NAME = 'starter-saas';

export const stripeAdmin = new Stripe(getEnvVar(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'), {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: APP_NAME,
    version: '0.1.0',
  },
});

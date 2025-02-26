// Add Node.js type definitions
declare const process: {
  env: {
    NODE_ENV?: string;
    VERCEL_ENV?: string;
    [key: string]: string | undefined;
  };
};

export function getEnvVar(varValue: string | undefined, varName: string): string {
  // During build time, return a placeholder if the environment variable is undefined
  if (varValue === undefined) {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
      console.warn(`Warning: Environment variable ${varName} is undefined`);
      // Return placeholder values for specific environment variables
      if (varName === 'STRIPE_SECRET_KEY') return 'sk_test_placeholder';
      if (varName === 'STRIPE_WEBHOOK_SECRET') return 'whsec_placeholder';
      if (varName === 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') return 'pk_test_placeholder';
    }
    
    // In development or if not a known variable, throw an error
    throw new ReferenceError(`Reference to undefined env var: ${varName}`);
  }
  
  return varValue;
}

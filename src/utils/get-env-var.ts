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
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV) {
      console.warn(`Warning: Environment variable ${varName} is undefined`);
      
      // Return placeholder values for specific environment variables
      // Stripe placeholders
      if (varName === 'STRIPE_SECRET_KEY') return 'sk_test_placeholder';
      if (varName === 'STRIPE_WEBHOOK_SECRET') return 'whsec_placeholder';
      if (varName === 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') return 'pk_test_placeholder';
      
      // Supabase placeholders
      if (varName === 'NEXT_PUBLIC_SUPABASE_URL') return 'https://jlyeiwarvfprdpqkiued.supabase.co';
      if (varName === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') return 'placeholder_anon_key';
      if (varName === 'SUPABASE_SERVICE_ROLE_KEY') return 'placeholder_service_role_key';
      if (varName === 'SUPABASE_DB_PASSWORD') return 'placeholder_db_password';
      
      // Resend placeholder
      if (varName === 'RESEND_API_KEY') return 'placeholder_resend_api_key';
      
      // Site URL placeholder
      if (varName === 'NEXT_PUBLIC_SITE_URL') return 'https://starter-saas-gold.vercel.app';
      
      // For any other environment variables, return a generic placeholder
      return `placeholder_for_${varName}`;
    }
    
    // In development or if not a known variable, throw an error
    throw new ReferenceError(`Reference to undefined env var: ${varName}`);
  }
  
  return varValue;
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};

// Validate required environment variables
const validateEnvironment = () => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required variables
  if (!ENV.oAuthServerUrl) {
    errors.push("OAUTH_SERVER_URL is not configured");
  }
  if (!ENV.appId) {
    errors.push("VITE_APP_ID is not configured");
  }
  if (!ENV.cookieSecret) {
    errors.push("JWT_SECRET is not configured");
  }

  // Optional variables with warnings
  if (!process.env.VITE_ANALYTICS_ENDPOINT) {
    warnings.push("VITE_ANALYTICS_ENDPOINT is not configured (analytics disabled)");
  }
  if (!process.env.VITE_ANALYTICS_WEBSITE_ID) {
    warnings.push("VITE_ANALYTICS_WEBSITE_ID is not configured (analytics disabled)");
  }

  // Log warnings
  if (warnings.length > 0) {
    warnings.forEach(warning => {
      console.warn(`[Config] ⚠️  ${warning}`);
    });
  }

  // Log errors and exit if critical variables are missing
  if (errors.length > 0) {
    errors.forEach(error => {
      console.error(`[Config] ❌ ${error}`);
    });
    if (ENV.isProduction) {
      console.error("[Config] Critical environment variables are missing. Exiting.");
      process.exit(1);
    } else {
      console.warn("[Config] Running in development mode with missing variables.");
    }
  }
};

// Run validation on module load
validateEnvironment();
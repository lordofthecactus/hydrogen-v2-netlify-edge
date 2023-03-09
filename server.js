// Import path interpreted by the Remix compiler
import * as build from "@remix-run/dev/server-build";
import { createRequestHandler } from "@netlify/remix-edge-adapter";
import { createStorefrontClient } from "@shopify/hydrogen";

const env = { ...process.env };

export default async function (request, context) {
  /**
   * Create Hydrogen's Storefront client.
   */
  const { storefront } = createStorefrontClient({
    // cache,
    // waitUntil,
    buyerIp: request.headers.get("x-forwarded-for"),
    i18n: { language: "EN", country: "US" },
    publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
    storeDomain: `https://${env.PUBLIC_STORE_DOMAIN}`,
    storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || "2023-01",
    storefrontId: env.PUBLIC_STOREFRONT_ID,
    requestGroupId: request.headers.get("request-id"),
  });

  const requestHandler = await createRequestHandler({
    build,
    // process.env.NODE_ENV is provided by Remix at compile time
    mode: process.env.NODE_ENV,
    getLoadContext: () => ({ storefront, env }),
  });

  const response = await requestHandler(request, context);
  return response;
}

export const config = {
  cache: "manual",
  path: "/*",
  // Let the CDN handle requests for static assets, i.e. /_assets/*
  //
  // Add other exclusions here, e.g. "/api/*" for custom Netlify functions or
  // custom Netlify Edge Functions
  excluded_patterns: ["/_assets/*"],
};

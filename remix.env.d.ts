/**
 * Declare local additions to `AppLoadContext` to include the session utilities we injected in `server.ts`.
 */
declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    waitUntil: ExecutionContext["waitUntil"];
    session: HydrogenSession;
    storefront: Storefront;
    cache: Cache;
    env: Env;
  }
}

// Needed to make this file a module.
export {};

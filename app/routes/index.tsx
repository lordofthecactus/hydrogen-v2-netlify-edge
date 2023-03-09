import { useLoaderData } from "react-router";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { Shop } from "@shopify/hydrogen/storefront-api-types";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export async function loader({ context }: LoaderArgs) {
  const layout = await context.storefront.query<{ shop: Shop }>(SHOP_QUERY);
  return { layout };
}

const SHOP_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;

export default function Index() {
  // TODO: this could be better
  const data: any = useLoaderData();
  const { name } = data.layout.shop;
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>This is your store name: {name}</p>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer noopener"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer noopener"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer noopener"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </main>
  );
}

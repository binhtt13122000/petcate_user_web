const publicRuntimeConfig =
    process.env.NODE_ENV === "development"
        ? {
              NEXT_PUBLIC_API_ROOT_URL: "http://localhost:4000",
              NEXT_PUBLIC_HASURA_END_POINT: "http://localhost:8080/v1/graphql",
              NEXT_PUBLIC_HASURA_ADMIN_SECRET: process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
              API_ROOT_URL: "http://localhost:4000",
              HASURA_END_POINT: "http://localhost:8080/v1/graphql",
              HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET || "",
              NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || "",
              NEXT_PUBLIC_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "",
              NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || "",
              NEXT_PUBLIC_STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "",
              NEXT_PUBLIC_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "",
              NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID || "",
              NEXT_PUBLIC_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID || "",
              NEXT_PUBLISH_CLOUD_MESSAGING_TOKEN:
                  process.env.NEXT_PUBLISH_CLOUD_MESSAGING_TOKEN || "",
          }
        : {
              NEXT_PUBLIC_API_ROOT_URL: "http://54.215.144.186:80",
              NEXT_PUBLIC_HASURA_END_POINT: "http://54.215.144.186:8080/v1/graphql",
              NEXT_PUBLIC_HASURA_ADMIN_SECRET: process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
              API_ROOT_URL: "http://54.215.144.186:80",
              HASURA_END_POINT: "http://54.215.144.186:8080/v1/graphql",
              HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET || "",
              NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || "",
              NEXT_PUBLIC_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "",
              NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || "",
              NEXT_PUBLIC_STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "",
              NEXT_PUBLIC_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "",
              NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID || "",
              NEXT_PUBLIC_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID || "",
              NEXT_PUBLISH_CLOUD_MESSAGING_TOKEN:
                  process.env.NEXT_PUBLISH_CLOUD_MESSAGING_TOKEN || "",
          };

export const {
    NEXT_PUBLIC_API_ROOT_URL,
    NEXT_PUBLIC_HASURA_END_POINT,
    NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_AUTH_DOMAIN,
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET,
    NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_MEASUREMENT_ID,
    NEXT_PUBLISH_CLOUD_MESSAGING_TOKEN,
    API_ROOT_URL,
    HASURA_END_POINT,
    HASURA_ADMIN_SECRET,
} = publicRuntimeConfig;

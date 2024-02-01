import { lucia } from "lucia";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { createClient } from "@libsql/client";
import { h3 } from "lucia/middleware";
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto as Crypto;

export const db = createClient({
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_TOKEN ?? "",
});

export const auth = lucia({
  env: process.dev ? "DEV" : "PROD",
  adapter: libsql(db, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  middleware: h3(),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;

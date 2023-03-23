declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      COOKIE_NAME: string;
    }
  }
}

export {};

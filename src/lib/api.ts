import { User } from "@prisma/client";

type FetcherParams = {
  url: RequestInfo | URL;
  method: string | undefined;
  body: { [key: string]: any };
  json?: boolean;
};

const fetcher = async ({ url, method, body, json = true }: FetcherParams) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("API Error");

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const login = async (user: { email: string; password: string }) => {
  return fetcher({
    url: "/api/login",
    method: "POST",
    body: user,
    json: false,
  });
};

export const createNewProject = async (name: string) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};

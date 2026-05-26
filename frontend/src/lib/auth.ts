import type { User } from "../types/user";

export function saveAuth(accessToken: string, user: User) {

  localStorage.setItem("access_token", accessToken);

  localStorage.setItem("user", JSON.stringify(user));

}

export function getAccessToken() {

  return localStorage.getItem("access_token");

}

export function getCurrentUser(): User | null {

  const raw = localStorage.getItem("user");

  if (!raw) {

    return null;

  }

  try {

    return JSON.parse(raw) as User;

  } catch {

    return null;

  }

}

export function logout() {

  localStorage.removeItem("access_token");

  localStorage.removeItem("user");

}

export function isAuthenticated() {

  return Boolean(getAccessToken());

}
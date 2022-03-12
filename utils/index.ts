import { format } from "date-fns";

import { ThemeType } from "@interfaces/index";

export const addTime = (minutes: number) => new Date(Date.now() + minutes * 60000);

export const getDefaultProfileImg = (username: string) => {
  return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(username)}.svg`;
};

export const sleep = (t: number) => new Promise(r => setTimeout(r, t));

export const formatDate = (
  date = new Date(),
  formatVal = "yyyy-MM-dd"
) => format(date, formatVal);

export const changeTheme = (
  theme: ThemeType,
  setTheme: (newTheme: ThemeType) => void
) => {
  setTheme(theme);
  localStorage.setItem("theme", theme);
};

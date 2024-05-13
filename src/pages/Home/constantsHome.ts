import { ComboboxProps } from "@mantine/core";

export const years: string[] = Array.from({ length: ((new Date()).getFullYear() + 5) - 1870 + 1 }, (n, i) =>
  String(i + 1870)
).reverse();

export const sortValues: string[] = [
  "Most Popular",
  "Least Popular",
  "Most Rated",
  "Least Rated",
  "Most Voted",
  "Least Voted",
];

export const dropdownProps: ComboboxProps | undefined = {
  transitionProps: { transition: "pop", duration: 300 },
};

export const initialFiltersValue = {
  genres: [],
  year: null,
  ratingMin: "",
  ratingMax: "",
}
import { ComboboxProps } from "@mantine/core";

export const years: string[] = Array.from({ length: ((new Date()).getFullYear() + 5) - 1870 + 1 }, (n, i) =>
  String(i + 1870)
).reverse();

export const sortValues: { name: string, value: string }[] = [
  { name: "Most Popular", value: "popularity.desc", },
  { name: "Least Popular", value: "popularity.asc", },
  { name: "Most Rated", value: "vote_average.desc", },
  { name: "Least Rated", value: "vote_average.asc", },
  { name: "Most Voted", value: "vote_count.desc", },
  { name: "Least Voted", value: "vote_count.asc", },
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
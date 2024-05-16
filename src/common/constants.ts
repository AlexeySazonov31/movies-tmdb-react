import { ComboboxProps } from "@mantine/core";

export const years: string[] = Array.from({ length: ((new Date()).getFullYear() + 8) - 1870 + 1 }, (n, i) =>
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

export const filterSvgYellow =
  "brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(4897%) hue-rotate(355deg) brightness(105%) contrast(105%)";
export const filterSvgGray =
  "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(133%) hue-rotate(195deg) brightness(89%) contrast(93%)";

export const initialSearch = {
  value: "",
  error: false,
}
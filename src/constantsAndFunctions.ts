import { ComboboxProps } from "@mantine/core";
import { DataMovies, Genre, Movie } from "./types";
import axios from "axios";


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





export const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

export const fetchMovies = (
  page: string,
  sort: string,
  genres: number[] | [],
  year: string | null,
  ratingMin: number | string | null,
  raitingMax: number | string | null
): Promise<DataMovies> =>
  axios
    .get("/api/movies", {
      params: {
        page: page,
        sort_by: sort,
        genres: genres,
        release_year: year,
        rating_min: ratingMin,
        rating_max: raitingMax,
      },
    })
    .then(response => response.data);

export const fetchMovie = (
  id: string
): Promise<Movie> =>
  axios.get(`/api/movie/${id}`).then(response => response.data)




export const filterSvgYellow =
  "brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(4897%) hue-rotate(355deg) brightness(105%) contrast(105%)";
export const filterSvgGray =
  "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(133%) hue-rotate(195deg) brightness(89%) contrast(93%)";




export function abbrNum(number: number | string, decPlaces: number) {
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["K", "M", "B", "T"];
  number = Number(number);
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number = String(number) + abbrev[i];
      break;
    }
  }
  return number;
}
// * get genres names Array
export function genresIdsToStringNames(
  arrIds: number[],
  genresArr: Genre[] | null,
  fullCard: boolean
): string {
  if (arrIds.length && genresArr?.length) {
    const arrNames = arrIds.map((id) => {
      const name = genresArr.find((genre) => id === genre.id)?.name;
      return name;
    });
    if (arrNames.length > 3 && !fullCard) {
      arrNames.splice(3);
    }
    if ((arrNames.join(", ")).length > 30 && !fullCard) {
      arrNames.splice(2);
      arrNames.push("...");
    }

    return arrNames.join(", ");
  } else {
    return "error";
  }
}





export function getRatedMovies(): Movie[] | null {
  const ratedMoviesJson: string | null = localStorage.getItem("ratedMovies");
  let res: Movie[] | null;
  if (ratedMoviesJson) {
    res = JSON.parse(ratedMoviesJson);
  } else {
    res = null;
  }
  return res;
}
export function getMovieRating(id: number, ratedMovies: Movie[] | null): number | null {
  if (ratedMovies) {
    const movie: Movie | undefined = ratedMovies.find(elem => elem.id === id);
    if (movie && movie.rating) {
      return movie.rating;
    }
  }
  return null;
}

export function timeConvert(n: number): string {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  let rminutes: string | number = Math.round(minutes);
  rminutes = String(rminutes).length === 1 ? "0" + rminutes : rminutes;
  return rhours + "h " + rminutes + "m";
}

export function dateConvert(n: string): string {
  return (new Date(n)).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}


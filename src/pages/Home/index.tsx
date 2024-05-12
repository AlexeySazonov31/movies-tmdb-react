import { useState } from "react";
import {
  Container,
  Text,
  MultiSelect,
  Select,
  UnstyledButton,
  Grid,
  Image,
  NumberInput,
  Loader,
  Center,
  ComboboxProps,
} from "@mantine/core";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import DownSvg from "/down.svg";
import CloseSvg from "/close.svg";
import { MovieCard } from "../../components/MovieCard";

// import style from "./Home.module.scss";

interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface DataMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const years: string[] = Array.from({ length: 2030 - 1870 + 1 }, (n, i) =>
  String(i + 1870)
).reverse();
const sortValues: string[] = [
  "Most Popular",
  "Least Popular",
  "Most Rated",
  "Least Rated",
  "Most Voted",
  "Least Voted",
];

// ComboboxLikeProps.comboboxProps?: ComboboxProps | undefined

const dropdownProps: ComboboxProps | undefined = {
  transitionProps: { transition: "pop", duration: 300 }
};

const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

const fetchMovies = (): Promise<DataMovies> =>
  axios.get("/api/movies").then((response) => response.data);

export const Home = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [year, setYear] = useState<string | null>("");
  const [ratingMin, setRatingMin] = useState<string | number>("");
  const [ratingMax, setRatingMax] = useState<string | number>("");
  const [sort, setSort] = useState<string | null>(sortValues[0]);

  const {
    isError: isErrorGenres,
    error: errorGenres,
    data: dataGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    retry: false,
  });

  const {
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    error: errorMovies,
    data: dataMovies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  console.log(isErrorMovies, errorMovies, dataMovies);

  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  const iconDown = <Image src={DownSvg} alt="icon down" h={24} w={24} />;
  const iconClose = <Image src={CloseSvg} alt="icon close" h={16} w={16} />;

  const resetFilters = (): void => {
    setGenres([]);
    setYear(null);
    setRatingMin("");
    setRatingMax("");
  };

  type ResetBtnProps = {
    onClick: () => void;
    disabled?: boolean;
  };

  const resetBtnProps: ResetBtnProps = {
    onClick: resetFilters,
  };

  if (!genres.length && !year && !ratingMin && !ratingMax) {
    console.log("disabled reset btn");
    resetBtnProps.disabled = true;
  }

  return (
    <Container size={980} mt={40} p={0}>
      <Text size="32px" fw={700} pb={40}>
        Movies
      </Text>
      <Grid align="flex-end" gutter="16px" columns={10.13}>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <MultiSelect
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Genres"
            value={genres}
            onChange={setGenres}
            placeholder="Select genre"
            error={isErrorGenres}
            withScrollArea={false}
            withCheckIcon={false}
            data={dataGenres?.map((elem) => elem.name)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Release year"
            value={year}
            onChange={setYear}
            placeholder="Select release year"
            withScrollArea={false}
            withCheckIcon={false}
            data={years}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <Grid align="flex-end" gutter="8px">
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                label="Ratings"
                placeholder="From"
                value={ratingMin}
                onChange={setRatingMin}
                min={1}
                max={ratingMax ? Number(ratingMax) : 10}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6 }}>
              <NumberInput
                size="md"
                placeholder="To"
                value={ratingMax}
                onChange={setRatingMax}
                min={ratingMin ? Number(ratingMin) : 1}
                max={10}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <UnstyledButton {...resetBtnProps}>
            <span>Reset filters</span>
            {iconClose}
          </UnstyledButton>
        </Grid.Col>
      </Grid>
      <Grid align="flex-end" justify="end" gutter="16px" columns={10} my={24}>
        <Grid.Col span={{ base: 10, md: 5, lg: 3 }}>
          <Select
            size="md"
            comboboxProps={dropdownProps}
            rightSection={iconDown}
            label="Sort by"
            value={sort}
            onChange={setSort}
            withScrollArea={false}
            withCheckIcon={false}
            data={sortValues}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        {isLoadingMovies && (
          <Center w="100%" h="40vh" component={Loader} color="purple.4" />
        )}
        {dataMovies?.results.map((elem) => {
          return (
            <Grid.Col span={{ base: 6 }}>
              <MovieCard data={elem} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};

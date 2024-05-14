import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Genre, DataMovies, FiltersValue, SortValue } from "../../types";
import axios from "axios";

import {
  Container,
  Text,
  Grid,
  Pagination,
  Group,
  Center,
  Stack,
  Image,
} from "@mantine/core";

import { MovieCard, Filters, MovieSkeleton } from "../../components";
import { useEffect, useState } from "react";
import { sortValues, initialFiltersValue } from "../../constants";

const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

const fetchMovies = (
  page: string,
  sort: string,
  genres: number[] | [] = [],
  year: string | null = null,
  ratingMin: number | string = "",
  raitingMax: number | string = ""
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
    .then((response) => response.data);

export const Home = () => {
  const [filtersValue, setFiltersValue] =
    useState<FiltersValue>(initialFiltersValue);
  const [sort, setSort] = useState<SortValue>(sortValues[0].name);
  const [activePage, setActivePage] = useState<number>(1);

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
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
    error: errorMovies,
    data: dataMovies,
  } = useQuery({
    queryKey: ["movies", activePage, sort, filtersValue],
    queryFn: () =>
      fetchMovies(
        String(activePage),
        String(sortValues.find((elem) => elem.name === sort)?.value),
        // * get genres ids Array
        filtersValue.genres.map((selectedGenre) => {
          const id = dataGenres?.find(
            (genre) => selectedGenre === genre.name
          )?.id;
          return Number(id);
        }),
        filtersValue.year,
        filtersValue.ratingMin,
        filtersValue.ratingMax
      ),
    placeholderData: keepPreviousData,
  });

  // TODO modal alert error
  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  useEffect(() => {
    setActivePage(1);
  }, [filtersValue]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activePage]);

  return (
    <Container size={980} mt={40} p={0}>
      <Text size="32px" fw={700} pb={40}>
        Movies
      </Text>
      <Filters
        filtersValue={filtersValue}
        setFiltersValue={setFiltersValue}
        sort={sort}
        setSort={setSort}
        isErrorGenres={isErrorGenres}
        dataGenres={dataGenres ? dataGenres : null}
      />
      <Grid>
        {isFetchingMovies &&
          [...Array(20)].map((elem, key) => {
            return (
              <Grid.Col key={key} span={{ base: 6 }}>
                <MovieSkeleton />
              </Grid.Col>
            );
          })}
        {!isFetchingMovies && dataMovies?.results.length ? (
          dataMovies?.results.map((elem) => {
            return (
              <Grid.Col key={elem.id} span={{ base: 6 }}>
                <MovieCard data={elem} />
              </Grid.Col>
            );
          })
        ) : (
          <Grid.Col span={{ base: 12 }}>
            <Stack justify="flex-start" align="center" h="70vh">
              <Image src="/no-movies.png" alt="no movies" w={311} h={252} />
              <Text size="20" fw={600} mt={16} lh={1}>
                We don't have such movies, look for another one
              </Text>
            </Stack>
          </Grid.Col>
        )}
      </Grid>
      {isErrorMovies && (
        <Center h="40vh">
          <Text size="20" fw={600}>
            Error: {errorMovies.message}
          </Text>
        </Center>
      )}
      {dataMovies?.results.length && Number(dataMovies.total_pages) > 1 ? (
        <Group justify="end" mt={24} mb={82}>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={
              dataMovies?.total_pages > 500 ? 500 : dataMovies?.total_pages
            }
          />
        </Group>
      ) : (
        <></>
      )}
    </Container>
  );
};

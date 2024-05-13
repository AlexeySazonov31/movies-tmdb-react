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
} from "@mantine/core";

import { MovieCard, Filters, MovieSkeleton } from "../../components";
import { useEffect, useState } from "react";
import { sortValues, initialFiltersValue } from "./constantsHome";

// import style from "./Home.module.scss";

const fetchGenres = (): Promise<Genre[]> =>
  axios.get("/api/genres").then((response) => response.data.genres);

const fetchMovies = (page: string): Promise<DataMovies> =>
  axios
    .get("/api/movies", { params: { page: page } })
    .then((response) => response.data);

export const Home = () => {
  const [filtersValue, setFiltersValue] =
    useState<FiltersValue>(initialFiltersValue);
  const [sort, setSort] = useState<SortValue>(sortValues[0]);
  const [activePage, setActivePage] = useState(1);

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
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    error: errorMovies,
    data: dataMovies,
  } = useQuery({
    queryKey: ["movies", activePage],
    queryFn: () => fetchMovies(String(activePage)),
    placeholderData: keepPreviousData,
  });

  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  console.log(isErrorMovies, errorMovies);

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
        {(isLoadingMovies || isFetchingMovies) &&
          [...Array(20)].map((elem, key) => {
            return (
              <Grid.Col key={key} span={{ base: 6 }}>
                <MovieSkeleton />
              </Grid.Col>
            );
          })}
        {dataMovies &&
          !isFetchingMovies &&
          dataMovies?.results.map((elem) => {
            return (
              <Grid.Col key={elem.id} span={{ base: 6 }}>
                <MovieCard data={elem} />
              </Grid.Col>
            );
          })}
      </Grid>
      {isErrorMovies && (
        <Center h="40vh">
          <Text size="20" fw={600}>
            Error: {errorMovies.message}
          </Text>
        </Center>
      )}
      {dataMovies && (
        <Group justify="end" mt={24} mb={82}>
          <Pagination
            value={activePage}
            onChange={setActivePage}
            total={
              dataMovies?.total_pages > 500 ? 500 : dataMovies?.total_pages
            }
          />
        </Group>
      )}
    </Container>
  );
};

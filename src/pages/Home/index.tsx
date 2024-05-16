import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FiltersValue, SortValue, MoviesOrNull } from "../../common/types";

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
import {
  fetchGenres,
  fetchMovies,
  getRatedMovies,
  getMovieRating,
} from "../../common/utils";

import {
  sortValues,
  initialFiltersValue,
} from "../../common/constants";

export const Home = () => {
  const [filtersValue, setFiltersValue] =
    useState<FiltersValue>(initialFiltersValue);
  const [sort, setSort] = useState<SortValue>(sortValues[0].name);
  const [activePage, setActivePage] = useState<number>(1);
  const [ratedMovies, setRatedMovies] = useState<MoviesOrNull>(
    getRatedMovies()
  );

  // * get Genres
  const {
    isError: isErrorGenres,
    error: errorGenres,
    data: dataGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    retry: false,
  });

  // * get Movies
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
        filtersValue.ratingMin ? filtersValue.ratingMin : null,
        filtersValue.ratingMax ? filtersValue.ratingMax : null
      ),
    placeholderData: keepPreviousData,
  });

  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  useEffect(() => {
    setActivePage(1);
  }, [filtersValue, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activePage]);

  return (
    <Container size={980} mt={24} p={0} mih="80vh">
      <Text size="32px" fw={700} mb={40} py={8}>
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
      <Grid justify="center">
        {isFetchingMovies &&
          [...Array(20)].map((elem, key) => {
            return (
              <Grid.Col key={key} span={{ base: 12, md: 6, lg: 6 }}>
                <MovieSkeleton />
              </Grid.Col>
            );
          })}
        {!isFetchingMovies && dataMovies?.results.length
          ? dataMovies?.results.map((elem) => {
              return (
                <Grid.Col key={elem.id} span={{ base: 12, md: 6, lg: 6 }}>
                  <MovieCard
                    data={elem}
                    genres={dataGenres ? dataGenres : null}
                    rating={getMovieRating(elem.id, ratedMovies)}
                    setRatedMovies={setRatedMovies}
                  />
                </Grid.Col>
              );
            })
          : !isErrorMovies &&
            !isFetchingMovies && (
              <Grid.Col span={{ base: 12 }}>
                <Stack justify="flex-start" align="center">
                  <Image src="/no-movies.png" alt="no movies" w={311} h={252} />
                  <Text size="20" fw={600} mt={16} lh={1.3} ta="center">
                    We don't have such movies, look for another one
                  </Text>
                </Stack>
              </Grid.Col>
            )}
      </Grid>
      {!isFetchingMovies && isErrorMovies && (
        <Center h="40vh">
          <Text size="20px" fw={600}>
            Error: {errorMovies.message}
          </Text>
        </Center>
      )}
      {dataMovies?.results.length && Number(dataMovies.total_pages) > 1 ? (
        <Group justify="end" mt={24}>
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

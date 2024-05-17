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
  getRatedMovies,
  getMovieRating,
  getGenresIdsArr,
} from "../../common/utils";

import { sortValues, initialFiltersValue } from "../../common/constants";
import { useGenres, useMovies } from "../../common/api";

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
  } = useGenres();

  // * get Movies
  const {
    isFetching: isFetchingMovies,
    isError: isErrorMovies,
    error: errorMovies,
    data: dataMovies,
  } = useMovies(
    activePage,
    sort,
    filtersValue,
    getGenresIdsArr(filtersValue, dataGenres ? dataGenres : [])
  );

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
    <Container
      size={980}
      pt={40}
      // px={{ base: "0px", xs: 60, sm: "0px" }}
      px={5}
      mih="80vh"
    >
      <Text size="32px" fw={700} mb={{ base: 30, sm: 36 }} py={8}>
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
      <Grid justify="center" pt={{ base: 25, sm: 0 }}>
        {isFetchingMovies &&
          [...Array(20).keys()].map((elem) => {
            return (
              <Grid.Col
                key={elem}
                span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 6 }}
              >
                <MovieSkeleton />
              </Grid.Col>
            );
          })}
        {!isFetchingMovies && dataMovies?.results.length ? (
          dataMovies?.results.map((elem) => {
            return (
              <Grid.Col
                key={elem.id}
                span={{ base: 12, xs: 12, sm: 12, md: 6, lg: 6 }}
              >
                <MovieCard
                  data={elem}
                  genres={dataGenres ? dataGenres : null}
                  rating={getMovieRating(elem.id, ratedMovies)}
                  setRatedMovies={setRatedMovies}
                />
              </Grid.Col>
            );
          })
        ) : (
          <></>
        )}
      </Grid>
      {!isErrorMovies && !isFetchingMovies && !dataMovies?.results.length && (
        <Center h="40vh" mt={20}>
          <Stack justify="flex-start" align="center">
            <Image src="/no-movies.png" alt="no movies" w={311} h={252} />
            <Text size="20" fw={600} mt={16} lh={1.3} ta="center">
              We don't have such movies, look for another one
            </Text>
          </Stack>
        </Center>
      )}
      {!isFetchingMovies && isErrorMovies && (
        <Center h="40vh" mt={20}>
          <Stack justify="flex-start" align="center">
            <Image src="/no-movies.png" alt="no movies" w={311} h={252} />
            <Text size="20px" fw={600} ta="center">
              Error: {errorMovies.message}
            </Text>
          </Stack>
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
            siblings={1}
            boundaries={0}
          />
        </Group>
      ) : (
        <></>
      )}
    </Container>
  );
};

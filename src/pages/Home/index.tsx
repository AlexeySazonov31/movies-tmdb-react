import { useState } from "react";

import { sortValues, initialFiltersValue } from "../../common/constants";
import { useGenres, useMovies } from "../../common/api";
import { FiltersValue, SortValue, MoviesOrNull } from "../../common/types";
import {
  getRatedMovies,
  getMovieRating,
  getGenresIdsArr,
} from "../../common/utils";

import {
  MovieCard,
  Filters,
  MovieCardSkeleton,
  Pagination,
  Message,
} from "../../components";

import { Container, Text, Grid, Group, Space } from "@mantine/core";

export const Home = () => {
  // ? think about save the states in the url query params to add feature go back in a history

  // * get filters from sessionStorage if exist
  // * (for the convenience of returning from the page of the Full Movie and reload page for update info),
  // * else return initial Filters Value
  const [filtersValue, setFiltersValue] = useState<FiltersValue>(() => {
    const filtersJson = sessionStorage.getItem("filters");
    if (typeof filtersJson === "string") {
      return JSON.parse(filtersJson);
    } else {
      return initialFiltersValue;
    }
  });

  // * get sort Value from sessionStorage if exist
  // * (for the convenience of returning from the page of the Full Movie and reload page for update info),
  // * else return base Sort Value
  const [sort, setSort] = useState<SortValue>(() => {
    const sortJson = sessionStorage.getItem("sort");
    if (typeof sortJson === "string") {
      return String(JSON.parse(sortJson));
    } else {
      return sortValues[0].name;
    }
  });

  // * get page from sessionStorage if exist
  // * (for the convenience of returning from the page of the Full Movie and reload page for update info),
  // * else return 1 page
  const [activePage, setActivePage] = useState<number>(() => {
    const activePageJson = sessionStorage.getItem("homePage");
    if (typeof activePageJson === "string") {
      return Number(JSON.parse(activePageJson));
    } else {
      return 1;
    }
  });

  // * get Rated Movies from LocalStorage
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
  // * all inputs are strictly standardized,
  // * so there is no point in additional validation, it is already built in,
  // * p.s. I deprive my users of errors in its rudiment)
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

  // * if error with get genres info =>
  // * the text in genres input will turn red
  // * and we will send error in console
  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  return (
    <Container size={980} px={5}>
      <Text size="32px" fw={700} mt={{base: 10, sm: 0}} mb={{ base: 30, sm: 36 }} py={8}>
        Movies
      </Text>
      {/* // * filters */}
      <Filters
        filtersValue={filtersValue}
        setFiltersValue={setFiltersValue}
        sort={sort}
        setSort={setSort}
        isErrorGenres={isErrorGenres}
        dataGenres={dataGenres ? dataGenres : null}
        setActivePage={setActivePage}
      />
      {/* // * error if exist */}
      {!isFetchingMovies && isErrorMovies && (
        <Message
          imageSrc="/no-movies.png"
          text={errorMovies.message}
          height="fit-content"
        />
      )}
      {/* // * empty state if empty */}
      {!isFetchingMovies && !isErrorMovies && !dataMovies?.results.length && (
        <Message
          imageSrc="/no-movies.png"
          text="We don't have such movies, look for another one"
          height="fit-content"
        />
      )}
      {/* // * movies info grid / skeletons grid (if loading) */}
      <Grid justify="center" pt={{ base: 25, sm: 0 }}>
        {/* // * state: loading movies data */}
        {isFetchingMovies &&
          [...Array(20).keys()].map((elem) => {
            return (
              <Grid.Col
                key={elem}
                span={{ base: 12, md: 6}}
              >
                <MovieCardSkeleton />
              </Grid.Col>
            );
          })}
        {/* // * state: show movies data */}
        {!isFetchingMovies && dataMovies?.results.length ? (
          dataMovies?.results.map((elem) => {
            return (
              <Grid.Col
                key={elem.id}
                span={{ base: 12, md: 6 }}
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
      {/* // * custom Pagination */}
      {dataMovies?.results.length && Number(dataMovies.total_pages) > 1 ? (
        <Group justify="end" mt={24}>
          <Pagination
            total={
              dataMovies?.total_pages > 500 ? 500 : dataMovies?.total_pages
            }
            activePage={activePage}
            setActivePage={setActivePage}
            sessionStorageKeyName="homePage"
          />
        </Group>
      ) : (
        <></>
      )}
      <Space h={100} />
    </Container>
  );
};

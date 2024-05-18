import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MoviesOrNull, Search } from "../../common/types";
import { initialSearch } from "../../common/constants";
import {
  getMovieRating,
  getRatedMovies,
  getShowMovieList,
  searchInRatedMovies,
} from "../../common/utils";
import { MovieCard, Pagination } from "../../components";

import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  em,
} from "@mantine/core";

import style from "./RatedMovies.module.scss";
import SearchSvg from "/search.svg";
import { useMediaQuery } from "@mantine/hooks";
import { useGenres } from "../../common/api";

export const RatedMovies = () => {
  // ? think about save the states in the url query params to add feature go back in history

  // * get search from sessionStorage if exist
  // * (for the convenience of returning from the page of the Full Movie and reload page for update info),
  // * else return initial state
  const [search, setSearch] = useState<Search>(() => {
    const searchValueJson = sessionStorage.getItem("searchRatedMovies");
    if (typeof searchValueJson === "string") {
      return JSON.parse(searchValueJson);
    } else {
      return initialSearch;
    }
  });

  // * get page from sessionStorage if exist
  // * (for the convenience of returning from the page of the Full Movie and reload page for update info),
  // * else return 1 page
  const [activePage, setActivePage] = useState<number>(() => {
    const activePageJson = sessionStorage.getItem("ratedPage");
    if (typeof activePageJson === "string") {
      return Number(JSON.parse(activePageJson));
    } else {
      return 1;
    }
  });

  // * get rated movies from localStorage
  const [ratedMovies, setRatedMovies] = useState<MoviesOrNull>(
    getRatedMovies()
  );

  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  // * get list of 4 movies to show
  const showMovieList: MoviesOrNull = getShowMovieList(ratedMovies, activePage);

  // * get Genres
  const {
    isError: isErrorGenres,
    error: errorGenres,
    data: dataGenres,
  } = useGenres();

  // in console, we explain what the problem is,
  // and the user will see cards without genres - that's offline mode ))
  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  const handleSearch = (): void => {
    if (search.value) {
      const searchedMovies = searchInRatedMovies(search.value);
      if (searchedMovies) {
        setRatedMovies(searchedMovies);
      } else {
        setRatedMovies(getRatedMovies());
        setSearch({ ...search, error: true });
      }
      setActivePage(1);
      sessionStorage.setItem("ratedPage", JSON.stringify(1));
      sessionStorage.setItem("searchRatedMovies", JSON.stringify(search));
    }
  };


  useEffect(() => {
    if (!search.value) {
      setRatedMovies(getRatedMovies());
      sessionStorage.setItem(
        "searchRatedMovies",
        JSON.stringify(initialSearch)
      );
    }
  }, [search.value]);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container size={980} pt={40} p={0} mih="70vh">
      {ratedMovies?.length && showMovieList ? (
        <>
          <Group
            wrap={isMobile ? "wrap" : "nowrap"}
            justify="space-between"
            align="center"
            pb={40}
          >
            <Text size="32px" fw={700}>
              Rated movies
            </Text>
            <TextInput
              placeholder="Search movie title"
              size="47px"
              leftSectionPointerEvents="none"
              w={isMobile ? "100%" : "50%"}
              mt={{ base: 15, sm: 0 }}
              value={search.value}
              error={search.error ? "No results" : false}
              onChange={(e) => {
                setSearch({ value: e.currentTarget.value, error: false });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              leftSection={<Image src={SearchSvg} alt="search icon" />}
              rightSection={
                <Button
                  fw={600}
                  size="14px"
                  w={88}
                  classNames={{
                    root: style.searchRoot,
                    inner: style.searchInner,
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              }
            />
          </Group>
          <Grid justify="center" h={{ base: "auto", md: "405px", lg: "468px" }}>
            {showMovieList.map((elem) => {
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
            })}
          </Grid>
          {ratedMovies.length > 4 ? (
            <Group justify="center" mt={24}>
              <Pagination
                total={Math.ceil(ratedMovies.length / 4)}
                activePage={activePage}
                setActivePage={setActivePage}
                sessionStorageKeyName="ratedPage"
              />
            </Group>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Stack
          justify="center"
          align="center"
          mih={{ base: "60vh", sm: "80vh" }}
          gap={16}
        >
          <Image
            src="/no-rated.png"
            alt="no movies"
            w={{ base: "100%", xs: 400 }}
            pt={{ base: "5vh", xs: "10vh" }}
          />
          <Text size="20px" fw={600} ta="center">
            You haven't rated any films yet
          </Text>
          <Button
            component={Link}
            h={40}
            to="/"
            classNames={{
              root: style.homeBtnToot,
              inner: style.homeBtnInner,
            }}
          >
            Find movies
          </Button>
        </Stack>
      )}
    </Container>
  );
};

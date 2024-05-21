import { useEffect, useState } from "react";

import { MoviesOrNull, Search } from "../../common/types";
import { initialSearch } from "../../common/constants";
import {
  getMovieRating,
  getRatedMovies,
  getShowMovieList,
  searchInRatedMovies,
} from "../../common/utils";
import { useGenres } from "../../common/api";

import { Message, MovieCard, Pagination } from "../../components";

import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Space,
  Text,
  TextInput,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import style from "./RatedMovies.module.scss";
import SearchSvg from "/search.svg";

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

  // * in console, we explain what the problem is,
  // * and the user will see cards without genres - that's offline mode ))
  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  // * search in rated movies Function
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

  // * with an empty search input, we show all the rated movies
  useEffect(() => {
    if (!search.value) {
      setRatedMovies(getRatedMovies());
      sessionStorage.setItem(
        "searchRatedMovies",
        JSON.stringify(initialSearch)
      );
    }
  }, [search.value]);

  // * when the page loads, if the search is not empty,
  // * we will get movies based on it
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container size={980} p={0} h="100%">
      {/* // * show movies list or empty state  */}
      {ratedMovies?.length && showMovieList ? (
        <>
          {/* // * title page + search input  */}
          <Flex
            direction={{base: "column", sm: "row"}}
            justify="space-between"
            align={{base: "start", sm: "center"}}
            pb={40}
          >
            <Text size="32px" fw={700} my={{ base: 15, sm: 0 }}>
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
          </Flex>
          {/* // * show movies list  */}
          <Grid justify="center" h={{ base: "auto", md: "405px", lg: "468px" }}>
            {showMovieList.map((elem) => {
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
            })}
          </Grid>
          {/* // * custom pagination  */}
          {ratedMovies.length > 4 && (
            <Group justify="center" mt={24}>
              <Pagination
                total={Math.ceil(ratedMovies.length / 4)}
                activePage={activePage}
                setActivePage={setActivePage}
                sessionStorageKeyName="ratedPage"
              />
            </Group>
          )}
          <Space h={100} />
        </>
      ) : (
        <Message
          imageSrc="/no-rated.png"
          text="You haven't rated any films yet"
          btnText="Find movies"
          height="100%"
          imageWidth={400}
          imageHeight={300}
        />
      )}
    </Container>
  );
};

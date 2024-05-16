import { useEffect, useState } from "react";

import {
  fetchGenres,
  getMovieRating,
  getRatedMovies,
} from "../../constantsAndFunctions";
import { Movie } from "../../types";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  Pagination,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { MovieCard } from "../../components";
import { Link } from "react-router-dom";

import style from "./RatedMovies.module.scss";

import SearchSvg from "/search.svg";

export const RatedMovies = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [ratedMovies, setRatedMovies] = useState<Movie[] | null>(
    getRatedMovies()
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchError, setSearchError] = useState<boolean>(false);

  // ge list of 4 movies to show
  let showMovieList: Movie[] | null;
  if (ratedMovies) {
    if (ratedMovies.length > 4) {
      if (activePage === 1) {
        showMovieList = ratedMovies.slice(0, 4);
      } else {
        showMovieList = ratedMovies.slice(
          (activePage - 1) * 4,
          (activePage - 1) * 4 + 4
        );
      }
    } else {
      showMovieList = ratedMovies;
    }
  } else {
    showMovieList = null;
  }

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

  if (isErrorGenres) {
    console.log(errorGenres.message);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activePage]);

  useEffect(() => {
    if (!searchValue) {
      setRatedMovies(getRatedMovies());
    }
  }, [searchValue]);

  const handleSearch = (): void => {
    if (searchValue) {
      const searchedMovies = searchInRatedMovies(searchValue);
      if (searchedMovies) {
        setRatedMovies(searchedMovies);
      } else {
        setRatedMovies(getRatedMovies());
        setSearchError(true);
      }
      setActivePage(1);
    }
  };

  const iconSearch = <Image src={SearchSvg} alt="search icon" />;
  const buttonSearch = (
    <Button
      fw={600}
      size="32px"
      w={88}
      classNames={{
        root: style.root,
        inner: style.inner,
      }}
      onClick={handleSearch}
    >
      Search
    </Button>
  );

  return (
    <Container size={980} p={0}>
      {ratedMovies?.length && showMovieList ? (
        <>
          <Group
            wrap="nowrap"
            justify="space-between"
            align="center"
            pb={40}
            mt={20}
          >
            <Text size="32px" fw={700}>
              Rated movies
            </Text>
            <TextInput
              placeholder="Search movie title"
              size="48px"
              leftSectionPointerEvents="none"
              leftSection={iconSearch}
              rightSection={buttonSearch}
              w={"50%"}
              value={searchValue}
              error={searchError ? "No results" : false}
              onChange={(e) => {
                setSearchValue(e.currentTarget.value);
                setSearchError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </Group>
          <Grid justify="center" h={{ base: "auto", md: "468px" }}>
            {showMovieList.map((elem) => {
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
            })}
          </Grid>
          {ratedMovies.length > 4 ? (
            <Group justify="center" mt={24}>
              <Pagination
                value={activePage}
                onChange={setActivePage}
                total={Math.ceil(ratedMovies.length / 4)}
              />
            </Group>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Stack justify="end" align="center" mih="73vh" gap={16}>
          <Image src="/no-rated.png" alt="no movies" w={400} />
          <Text size="20px" fw={600} ta="center">
            You haven't rated any films yet
          </Text>
          <Button
            component={Link}
            h={40}
            to="/"
            classNames={{
              root: style.root,
              inner: style.inner,
            }}
          >
            Find movies
          </Button>
        </Stack>
      )}
    </Container>
  );
};

function searchInRatedMovies(string: string): Movie[] | null {
  const ratedMoviesJson: string | null = localStorage.getItem("ratedMovies");
  let ratedMovies: Movie[] | null;

  if (ratedMoviesJson) {
    ratedMovies = JSON.parse(ratedMoviesJson);
  } else {
    ratedMovies = null;
  }
  if (ratedMovies) {
    const searchedMovies: Movie[] = [];
    for (const elem of ratedMovies) {
      if (elem.title.toLowerCase().search(string.toLowerCase()) !== -1) {
        searchedMovies.push(elem);
      }
    }
    if (searchedMovies.length) {
      return searchedMovies;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

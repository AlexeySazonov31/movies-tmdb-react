import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMovieRating, getRatedMovies } from "../../common/utils";
import { MoviesOrNull } from "../../common/types";
import { useMovie } from "../../common/api";

import { Message, MovieCard, MovieCardSkeleton } from "../../components";
import { MovieSecondCard } from "./MovieSecondCard";
import { MovieSecondCardSkeleton } from "./MovieSecondCardSkeleton";

import {
  Anchor,
  Breadcrumbs,
  Container,
  Stack,
  Skeleton,
  Space,
} from "@mantine/core";

export const FullMovie = () => {
  const { id } = useParams();

  // * get rated movies from LocalStorage
  const [ratedMovies, setRatedMovies] = useState<MoviesOrNull>(
    getRatedMovies()
  );

  // * get Movie
  const {
    isFetching: isFetchingMovie,
    isError: isErrorMovie,
    error: errorMovie,
    data,
  } = useMovie(id);

  // * this page always opens from the beginning
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container size={800} p={0} h="100%">
      {/* // * if error */}
      {!isFetchingMovie && isErrorMovie && (
        <Message text={errorMovie.message} height="100%" />
      )}
      <Stack gap={20}>
        {/* // * Breadcrumbs */}
        {isFetchingMovie && !isErrorMovie ? (
          <>
            {/* // * state: loading movie  */}
            <Skeleton w="50%" h={16} />
          </>
        ) : (
          !isErrorMovie && (
            <>
              {/* // * show movie  */}
              <Breadcrumbs>
                <Anchor component={Link} to="/">
                  Movies
                </Anchor>
                <Anchor component={Link} to={`/movies/${id}`}>
                  {data?.title}
                </Anchor>
              </Breadcrumbs>
            </>
          )
        )}
        {/* // * state: loading movie  */}
        {isFetchingMovie && !isErrorMovie && <MovieCardSkeleton full={true} />}
        {/* // * state: show movie  */}
        {data && (
          <MovieCard
            data={{ ...data, genre_ids: data.genres?.map((elem) => elem.id) }}
            genres={data.genres}
            rating={getMovieRating(data.id, ratedMovies)}
            setRatedMovies={setRatedMovies}
            full={true}
          />
        )}
        {/* // * show second movie card: Trailer, Description, Companies or loading  */}
        {(data?.videos?.results?.length ||
          data?.overview ||
          data?.production_companies?.length) &&
        !isErrorMovie ? (
          <MovieSecondCard data={data} />
        ) : !isErrorMovie && isFetchingMovie ? (
          <MovieSecondCardSkeleton />
        ) : (
          <></>
        )}
      </Stack>
      {!isErrorMovie && <Space h={100} />}
    </Container>
  );
};

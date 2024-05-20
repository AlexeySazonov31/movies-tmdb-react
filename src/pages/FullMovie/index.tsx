import {
  Anchor,
  Breadcrumbs,
  Container,
  Stack,
  Text,
  Skeleton,
  Center,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import {
  getMovieRating,
  getRatedMovies,
} from "../../common/utils";
import { MovieCard, MovieCardSkeleton } from "../../components";
import { MoviesOrNull } from "../../common/types";
import { useEffect, useState } from "react";
import { FullMovieInfo } from "./FullMovieInfo";
import { SkeletonFullMovieInfo } from "./SkeletonFullMovieInfo";
import { useMovie } from "../../common/api";

export const FullMovie = () => {
  const { id } = useParams();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container size={800} mt={24} p={0}>
      <Stack gap={20}>
        {isFetchingMovie && !data ? (
          <Skeleton w="50%" h={20} />
        ) : (
          !isErrorMovie && (
            <Breadcrumbs>
              <Anchor component={Link} to="/">
                Movies
              </Anchor>
              <Anchor component={Link} to={`/movies/${id}`}>
                {data?.title}
              </Anchor>
            </Breadcrumbs>
          )
        )}
        {isFetchingMovie && !data && <MovieCardSkeleton full={true} />}
        {data ? (
          <MovieCard
            data={{ ...data, genre_ids: data.genres?.map((elem) => elem.id) }}
            genres={data.genres}
            rating={getMovieRating(data.id, ratedMovies)}
            setRatedMovies={setRatedMovies}
            full={true}
          />
        ) : (
          !isFetchingMovie &&
          isErrorMovie && (
            <Center h="40vh">
              <Text size="20px" fw={600}>
                Error: {errorMovie.message}
              </Text>
            </Center>
          )
        )}
        {data?.videos?.results.length ||
        data?.overview ||
        data?.production_companies?.length ? (
          <FullMovieInfo data={data} />
        ) : !isErrorMovie &&
          isFetchingMovie ? (
          <SkeletonFullMovieInfo />
        ) : (
          <></>
        )}
      </Stack>
    </Container>
  );
};

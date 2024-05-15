import {
  Anchor,
  Breadcrumbs,
  Container,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import {
  fetchMovie,
  getMovieRating,
  getRatedMovies,
} from "../../constantsAndFunctions";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "../../components";
import { FullMovie as FullMovieType, Movie } from "../../types";
import { useState } from "react";

export const FullMovie = () => {
  const { id } = useParams();
  const [ratedMovies, setRatedMovies] = useState<
    (Movie | FullMovieType)[] | null
  >(getRatedMovies());

  // * get Movie
  const {
    // isFetching: isFetchingMovies,
    // isError: isErrorMovies,
    // error: errorMovies,
    data,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovie(id ? id : "error"),
  });

  return (
    <Container size={800} mt={24} p={0}>
      <Stack gap={20}>
        <Breadcrumbs>
          <Anchor component={Link} to="/">
            Movies
          </Anchor>
          <Anchor component={Link} to={`/movies/${id}`}>
            {data?.title}
          </Anchor>
        </Breadcrumbs>
        {data ? (
          <MovieCard
            data={data}
            genres={data.genres}
            rating={getMovieRating(data.id, ratedMovies)}
            setRatedMovies={setRatedMovies}
            full={true}
          />
        ) : (
          <></>
        )}
        <Paper p={24}>
          <Text fw={600} size="20px">
            Trailer
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};

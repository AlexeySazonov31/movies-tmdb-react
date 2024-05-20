import { Dispatch, useState } from "react";

import { filterSvgGray, filterSvgYellow } from "../../common/constants";
import { Movie, MoviesOrNull } from "../../common/types";

import {
  Modal,
  Divider,
  Rating,
  Button,
  Stack,
  Text,
  Image,
  Group,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import style from "./RatingModal.module.scss";

export const RatingModal = ({
  data,
  setRatedMovies,
  opened,
  close,
  rating,
  full,
}: {
  data: Movie;
  setRatedMovies: Dispatch<MoviesOrNull>;
  opened: boolean;
  close: () => void;
  rating: number | null;
  full: boolean;
}) => {
  const [ratingValue, setRatingValue] = useState<number>(rating ? rating : 0);
  const isSsBreakPoint = useMediaQuery(`(max-width: ${em(350)})`);

  // * save rating function
  const saveMovieRating = (): void => {
    // * 1 is min value for rating
    let ratingValueForSave: number = ratingValue;
    if (ratingValue === 0) {
      setRatingValue(1);
      ratingValueForSave = 1;
    }

    const json = localStorage.getItem("ratedMovies");
    let movies: Movie[];
    // * check exist rated movies
    if (json) {
      movies = JSON.parse(json);
      // * update rating or save new
      if (movies.find((elem) => elem.id === data.id)) {
        const index = movies.findIndex((elem) => elem.id === data.id);
        movies[index].rating = ratingValueForSave;
      } else {
        movies.push({
          ...data,
          rating: ratingValueForSave,
          genre_ids: full // * because fullMovieData haven't genre_ids, in movieCard component is used exactly genre_ids
            ? data.genres?.map((elem) => elem.id)
            : data.genre_ids,
        });
      }
    } else {
      movies = [
        {
          ...data,
          rating: ratingValueForSave,
          genre_ids: full // * because fullMovieData haven't genre_ids, in movieCard component is used exactly genre_ids
            ? data.genres?.map((elem) => elem.id)
            : data.genre_ids,
        },
      ];
    }
    localStorage.setItem("ratedMovies", JSON.stringify(movies));
    setRatedMovies(movies);
    close(); // * close modal
  };

  // * remove rating function
  const removeMovieRating = (): void => {
    const json = localStorage.getItem("ratedMovies");
    let movies: Movie[];
    // * check exist rated movies
    if (json) {
      movies = JSON.parse(json);
      const index = movies.findIndex((elem) => elem.id === data.id);
      movies.splice(index, 1);
    } else {
      movies = [];
    }
    if (!movies.length) {
      localStorage.removeItem("ratedMovies");
      setRatingValue(0);
      setRatedMovies(null);
      close(); // * close modal
    } else {
      localStorage.setItem("ratedMovies", JSON.stringify(movies));
      setRatingValue(0);
      setRatedMovies(movies);
      close(); // * close modal
    }
  };

  // * get star image for rating
  const getImageStarForRating = (isActive: boolean) => {
    return (
      <Image
        w={isSsBreakPoint ? 25 : 28}
        h={isSsBreakPoint ? 25 : 28}
        src="/star.svg"
        alt="rating icon"
        style={{
          filter: isActive ? filterSvgYellow : filterSvgGray,
        }}
      />
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Your rating"
      overlayProps={{
        backgroundOpacity: 0.2,
      }}
      size={380}
      centered
    >
      <Divider />
      <Stack p={16} gap={16}>
        <Text fw={600} h={22} lineClamp={1}>
          {data.title}
        </Text>
        <Rating
          count={10}
          size="xl"
          emptySymbol={getImageStarForRating(false)}
          fullSymbol={getImageStarForRating(true)}
          value={ratingValue}
          onChange={setRatingValue}
        />
        <Group gap={16}>
          <Button
            onClick={saveMovieRating}
            h={40}
            classNames={{
              root: style.modalBtnSaveRoot,
              inner: style.modalBtnSaveInner,
            }}
          >
            Save
          </Button>
          <Button
            variant="transparent"
            disabled={!rating}
            onClick={removeMovieRating}
            classNames={{
              root: style.modalBtnRemoveRoot,
              inner: style.modalBtnRemoveInner,
            }}
          >
            Remove rating
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

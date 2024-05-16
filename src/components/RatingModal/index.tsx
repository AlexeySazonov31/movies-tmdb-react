import { Dispatch, useState } from "react";
import { Movie, MoviesOrNull } from "../../common/types";

import style from "./RatingModal.module.scss";

import {
  Modal,
  Divider,
  Rating,
  Button,
  Stack,
  Text,
  Image,
  Group,
} from "@mantine/core";
import { filterSvgGray, filterSvgYellow } from "../../common/constants";

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

  const saveMovieRating = (): void => {
    // 1 is min for rating
    let ratingValueForSave: number = ratingValue;
    if (ratingValue === 0) {
      setRatingValue(1);
      ratingValueForSave = 1;
    }

    const json = localStorage.getItem("ratedMovies");
    let movies: Movie[];
    // check exist rated movies
    if (json) {
      movies = JSON.parse(json);
      // update rating or save new
      if (movies.find((elem) => elem.id === data.id)) {
        const index = movies.findIndex((elem) => elem.id === data.id);
        movies[index].rating = ratingValueForSave;
      } else {
        movies.push({
          ...data,
          rating: ratingValueForSave,
          genre_ids: full // because fullMovieData haven't genre_ids, in movieCard component is used exactly genre_ids
            ? data.genres?.map((elem) => elem.id)
            : data.genre_ids,
        });
      }
    } else {
      movies = [
        {
          ...data,
          rating: ratingValueForSave,
          genre_ids: full // because fullMovieData haven't genre_ids, in movieCard component is used exactly genre_ids
            ? data.genres?.map((elem) => elem.id)
            : data.genre_ids,
        },
      ];
    }
    localStorage.setItem("ratedMovies", JSON.stringify(movies));
    setRatedMovies(movies);
    close(); // close modal
  };

  const removeMovieRating = (): void => {
    const json = localStorage.getItem("ratedMovies");
    let movies: Movie[];
    // check exist rated movies
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
      close(); // close modal
    } else {
      localStorage.setItem("ratedMovies", JSON.stringify(movies));
      setRatingValue(0);
      setRatedMovies(movies);
      close(); // close modal
    }
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
      classNames={{
        content: style.modalContent,
        body: style.modalBody,
        header: style.modalHeader,
        close: style.modalClose,
      }}
      centered
    >
      <Divider />
      <Stack p={16} gap={16}>
        <Text fw={600} h={22}>{data.title}</Text>
        <Rating
          count={10}
          size="xl"
          emptySymbol={
            <Image
              w={28}
              h={28}
              src="/star.svg"
              alt="rating icon"
              style={{
                filter: filterSvgGray,
              }}
            />
          }
          fullSymbol={
            <Image
              w={28}
              h={28}
              src="/star.svg"
              alt="rating icon"
              style={{
                filter: filterSvgYellow,
              }}
            />
          }
          classNames={{
            root: style.ratingRoot,
          }}
          value={ratingValue}
          onChange={setRatingValue}
        />
        <Group gap={16}>
          <Button
            classNames={{
              root: style.modalBtnSaveRoot,
              inner: style.modalBtnSaveInner,
            }}
            onClick={saveMovieRating}
            h={40}
          >
            Save
          </Button>
          <Button
            variant="transparent"
            classNames={{
              root: style.modalBtnRemoveRoot,
              inner: style.modalBtnRemoveInner,
            }}
            disabled={!rating}
            onClick={removeMovieRating}
          >
            Remove rating
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

import { Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

import {
  ActionIcon,
  Flex,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";

import { Genre, Movie, MoviesOrNull } from "../../common/types";

import style from "./MovieCard.module.scss";
import { filterSvgYellow } from "../../common/constants";

import { RatingModal } from "../RatingModal";
import { MovieCardInfo } from "./MovieCardInfo";
import { abbrNum } from "../../common/utils";

export const MovieCard = ({
  data,
  genres,
  rating = null,
  setRatedMovies,
  full = false,
}: {
  data: Movie;
  genres: Genre[] | null | undefined;
  rating: number | null;
  setRatedMovies: Dispatch<MoviesOrNull>;
  full?: boolean;
}) => {
  const [isImageLoad, setIsImageLoad] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false); // * modal

  return (
    <>
      <RatingModal
        data={data}
        setRatedMovies={setRatedMovies}
        opened={opened}
        close={close}
        rating={rating}
        full={full ? full : false}
      />
      <Paper p={{base: 10, xs: 20, sm: 24}}>
        <Flex wrap="nowrap">
          {/* image block start */}
          {!isImageLoad && data.poster_path && (
            <Skeleton
              w={full ? 352 : 160}
              h={full ? 352 : 170}
              style={{
                borderRadius: 0,
              }}
            />
          )}
          <Image
            w={full ? 250 : 119}
            h={full ? "auto" : 170}
            src={
              data.poster_path
                ? "https://image.tmdb.org/t/p/w500" + data.poster_path
                : "/no-poster.jpg"
            }
            onLoad={() => setIsImageLoad(true)}
            alt={data.title}
            style={{
              display: !isImageLoad && data.poster_path ? "none" : "inline",
            }}
          />
          {/* image block end */}
          <Stack ml={16} w="100%" align="flex-start" justify="space-between">
            <Group
              w="100%"
              justify="space-between"
              align="flex-start"
              wrap="nowrap"
              gap={10}
            >
              <Stack align="flex-start" justify="flex-start" gap={6}>
                {full ? (
                  <Text classNames={{ root: style.title }} component="h1">{data.title}</Text>
                ) : (
                  <Text
                    classNames={{ root: style.titleLink }}
                    component={Link}
                    to={`/movies/${data.id}`}
                    lineClamp={2}
                  >
                    {data.title}
                  </Text>
                )}

                {data.release_date && (
                  <Text span c="gray.6">
                    {new Date(data.release_date).getFullYear()}
                  </Text>
                )}
                {data.vote_count > 0 && (
                  <Group gap={6} wrap="nowrap">
                    <Image
                      w={28}
                      h={28}
                      src="/star.svg"
                      alt="rating icon"
                      style={{
                        filter: filterSvgYellow,
                      }}
                    />
                    <Text fw={600}>
                      {data.vote_average.toFixed(1)}
                      <Text
                        span
                        c="gray.6"
                        inherit
                        fw={500}
                        ml={7}
                        style={{
                          position: "relative",
                          bottom: "0.5px",
                        }}
                      >
                        ({abbrNum(data.vote_count, 0)})
                      </Text>
                    </Text>
                  </Group>
                )}
              </Stack>
              <Group wrap="nowrap" gap={0}>
                <ActionIcon
                  variant="transparent"
                  size="lg"
                  classNames={{
                    root: rating
                      ? style.ratingBtnIconRated
                      : style.ratingBtnIcon,
                  }}
                  onClick={open}
                >
                  <Image w={28} h={28} src="/star.svg" alt="rating icon" />
                </ActionIcon>
                {rating ? (
                  <Text fw={600} ml={3} pt={1}>
                    {rating}
                  </Text>
                ) : (
                  <></>
                )}
              </Group>
            </Group>

            <MovieCardInfo data={data} genres={genres} full={full} />
          </Stack>
        </Flex>
      </Paper>
    </>
  );
};

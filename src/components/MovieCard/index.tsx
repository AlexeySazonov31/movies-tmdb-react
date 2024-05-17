import { Dispatch, useState } from "react";
import { Link } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import {
  ActionIcon,
  Flex,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
  em,
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

  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const isXsBreakPoint = useMediaQuery(`(max-width: ${em(575)})`);

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
      <Paper p={ full ? {base: 15, xs: 24} : { base: 15, xs: 20, sm: 24, md: 18, lg: 24 }}>
      <Flex wrap={ isXsBreakPoint && full ? "wrap" : "nowrap"} justify={isXsBreakPoint ? "center" : "space-between"} gap={16}>
          {/* image block start */}
          {!isImageLoad && data.poster_path && (
            <Skeleton
              w={full ? {base: "100%", xs: 380, sm: 268, md: 352} : 160}
              h={full ? {base: 545, xs: 372, sm: 250, md: 375 } : { base: 160, xs: 170, sm: 170, md: 150, lg: 170 }}
              style={{
                borderRadius: 0,
              }}
            />
          )}
          <Image
            w={full ? {base: "100%", xs: 230, sm: 170, md: 250} : { base: 100, xs: 119, sm: 119, md: 100, lg: 119 }}
            h={
              full ? "auto" : { base: 155, xs: 170, sm: 170, md: 150, lg: 170 }
            }
            src={
              data.poster_path
                ? import.meta.env.VITE_API_URL + "/image" + data.poster_path
                : "/no-poster.jpg"
            }
            onLoad={() => setIsImageLoad(true)}
            alt={data.title}
            style={{
              display: !isImageLoad && data.poster_path ? "none" : "inline",
            }}
          />
          {/* image block end */}
          <Stack w="100%" align="flex-start" justify="space-between">
            <Stack align="flex-start" justify="flex-start" gap={2} w="100%">
              <Group
                w="100%"
                justify="space-between"
                align="center"
                wrap="nowrap"
                gap={10}
              >
                {full ? (
                  <Text classNames={{ root: style.title }} component="h1" lineClamp={2}>
                    {data.title}
                  </Text>
                ) : (
                  <Text
                    classNames={{ root: style.titleLink }}
                    component={Link}
                    to={`/movies/${data.id}`}
                    lineClamp={isMobile ? 1 : 2}
                  >
                    {data.title}
                  </Text>
                )}
                {/* For devices with screens smaller than 350px, 
                you can add a rating only on the movie page! */}
                <Group
                  wrap="nowrap"
                  gap={0}
                  className={full ? "" : "mantine-visible-from-ss"}
                  style={{
                    alignSelf: "flex-start",
                  }}
                >
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

            <MovieCardInfo data={data} genres={genres} full={full} />
          </Stack>
        </Flex>
      </Paper>
    </>
  );
};

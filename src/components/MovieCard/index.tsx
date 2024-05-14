import { useState } from "react";
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
  Modal,
  Divider,
  Rating,
  Button,
} from "@mantine/core";

import { Genre, Movie } from "../../types";

import style from "./MovieCard.module.scss";

export const MovieCard = ({
  data,
  genres,
}: {
  data: Movie;
  genres: Genre[] | null;
}) => {
  const [isImageLoad, setIsImageLoad] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [ratingValue, setRatingValue] = useState(0);

  return (
    <>
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
          <Text fw={600}>{data.title}</Text>
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
                  filter:
                    "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(133%) hue-rotate(195deg) brightness(89%) contrast(93%)",
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
                  filter:
                    "brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(4897%) hue-rotate(355deg) brightness(105%) contrast(105%)",
                }}
              />
            }
            classNames={{
              root: style.ratingRoot,
            }}
            value={ratingValue}
            onChange={setRatingValue}
            defaultValue={2.33333333}
          />
          <Group gap={16}>
            <Button
              classNames={{
                root: style.modalBtnSaveRoot,
                inner: style.modalBtnSaveInner,
              }}
            >
              Save
            </Button>
            <Button
              variant="transparent"
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

      <Paper p={24}>
        <Flex wrap="nowrap">
          {/* image block start */}
          {!isImageLoad && data.poster_path && (
            <Skeleton
              w={182}
              h={170}
              style={{
                borderRadius: 0,
              }}
            />
          )}
          <Image
            w={119}
            h={170}
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
            >
              <Stack align="flex-start" justify="flex-start" gap={6}>
                <Text
                  classNames={{ root: style.titleLink }}
                  component={Link}
                  to={`/movies/${data.id}`}
                  mt={3}
                >
                  {data.title}
                </Text>
                {data.release_date && (
                  <Text c="gray.6" mt={1}>
                    {new Date(data.release_date).getFullYear()}
                  </Text>
                )}
                {data.vote_count > 0 && (
                  <Group gap={6}>
                    <Image
                      w={28}
                      h={28}
                      src="/star.svg"
                      alt="rating icon"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(70%) sepia(92%) saturate(1138%) hue-rotate(351deg) brightness(95%) contrast(106%)",
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
              <ActionIcon
                variant="transparent"
                size="lg"
                classNames={{ root: style.ratingBtnIcon }}
                onClick={open}
              >
                <Image w={28} h={28} src="/star.svg" alt="rating icon" />
              </ActionIcon>
            </Group>
            <Stack align="flex-start" justify="flex-start">
              {genres?.length && (
                <Text c="gray.6">
                  Genres
                  <Text
                    span
                    c="black"
                    inherit
                    ml={6}
                    style={{
                      position: "relative",
                      bottom: "-1px",
                    }}
                  >
                    {genresIdsToStringNames(data.genre_ids, genres)}
                  </Text>
                </Text>
              )}
            </Stack>
          </Stack>
        </Flex>
      </Paper>
    </>
  );
};

function abbrNum(number: number | string, decPlaces: number) {
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["K", "M", "B", "T"];
  number = Number(number);
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number = String(number) + abbrev[i];
      break;
    }
  }
  return number;
}
// * get genres names Array
function genresIdsToStringNames(arrIds: number[], genresArr: Genre[]): string {
  const arrNames = arrIds.map((id) => {
    const name = genresArr.find((genre) => id === genre.id)?.name;
    return name;
  });
  if (arrNames.length > 3) {
    arrNames.splice(3);
    if (arrNames.join(", ").length > 34) {
      arrNames.splice(2);
      arrNames.push("...");
    }
  }
  return arrNames.join(", ");
}

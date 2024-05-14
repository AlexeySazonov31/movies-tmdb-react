import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Image,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";

import { Movie } from "../../types";
import { useState } from "react";

export const MovieCard = ({ data }: { data: Movie }) => {
  const [isImageLoad, setIsImageLoad] = useState<boolean>(false);
  return (
    <Paper p={24}>
      <Flex>
        {!isImageLoad && data.poster_path && (
          <Skeleton
            w={170}
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
        <Box ml={16} w="100%">
          <Group justify={"space-between"} align="flex-start">
            <Text w="80%" size={"20px"} lh={1.3} c="purple.5" fw={600}>
              {data.title}
            </Text>
            <ActionIcon variant="transparent" size="lg">
              <Image w={28} h={28} src="/star.svg" alt="rating icon" />
            </ActionIcon>
          </Group>
          {data.release_date && (
            <Text>{new Date(data.release_date).getFullYear()}</Text>
          )}
          {data.vote_count > 0 && (
            <Text>
              {data.vote_average}, {data.vote_count}
            </Text>
          )}
        </Box>
      </Flex>
    </Paper>
  );
};

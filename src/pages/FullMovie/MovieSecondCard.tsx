import { useState } from "react";

import { getTheBestVideo } from "../../common/utils";
import { Movie } from "../../common/types";
import YouTube, { YouTubeProps } from "react-youtube";

import {
  Paper,
  Stack,
  Text,
  Divider,
  Box,
  Group,
  Avatar,
  Skeleton,
  em,
} from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";

import style from "./FullMovie.module.scss";

export const MovieSecondCard = ({ data }: { data: Movie }) => {
  const [isYoutubeLoaded, setIsYoutubeLoaded] = useState<boolean>(false);

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const isMdBreakPoint = useMediaQuery(`(max-width: ${em(992)})`);
  const { width } = useViewportSize();

  // * sizes for YouTube Component
  const opts: YouTubeProps["opts"] = {
    width: isMobile ? "100%" : isMdBreakPoint ? "430" : "500",
    height: isMobile ? (width * 9) / 16 : isMdBreakPoint ? "240" : "281",
  };

  return (
    <Paper p={{ base: 15, xs: 24 }}>
      <Stack gap={20}>
        {/* // * Trailer  */}
        {data?.videos?.results.length && data.videos.results[0].key ? (
          <>
            <Text fw={600} size="20px" component="h3">
              Trailer
            </Text>
            {!isYoutubeLoaded && (
              <Skeleton
                w={{ base: "100%", sm: 430, md: 500 }}
                h={{ base: (width * 9) / 16, sm: 247, md: 287 }}
              />
            )}
            <YouTube
              iframeClassName={style.youtube}
              videoId={getTheBestVideo(data.videos.results)}
              opts={opts}
              onReady={() => {
                setTimeout(() => {
                  setIsYoutubeLoaded(true);
                }, 300);
              }}
              style={{
                display: isYoutubeLoaded ? "block" : "none",
              }}
            />
          </>
        ) : (
          <></>
        )}
        {data?.videos?.results.length &&
        data.videos.results[0].key &&
        (data?.overview || data?.production_companies?.length) ? (
          <Divider />
        ) : (
          <></>
        )}
        {/* // * Description  */}
        {data?.overview ? (
          <Box>
            <Text fw={600} size="20px" component="h2">
              Description
            </Text>
            <Text mt={16}>{data.overview}</Text>
          </Box>
        ) : (
          <></>
        )}
        {data?.production_companies?.length && data?.overview ? (
          <Divider />
        ) : (
          <></>
        )}
        {/* // * Production  */}
        {data?.production_companies?.length ? (
          <Box>
            <Text fw={600} size="20px" mb={20} component="h3">
              Production
            </Text>
            <Stack gap={12}>
              {data.production_companies.map((elem) => {
                return (
                  <Group gap={8} key={elem.id}>
                    <Avatar
                      src={
                        elem.logo_path
                          ? import.meta.env.VITE_API_URL +
                            "/image/middle" +
                            elem.logo_path
                          : null
                      }
                      alt={elem.name}
                      w={40}
                      h={40}
                    >
                      {elem.logo_path ? "" : elem.name.slice(0, 1)}
                    </Avatar>
                    <Text fw={600}>{elem.name}</Text>
                  </Group>
                );
              })}
            </Stack>
          </Box>
        ) : (
          <></>
        )}
      </Stack>
    </Paper>
  );
};

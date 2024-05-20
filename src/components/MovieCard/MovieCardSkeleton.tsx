import { Paper, Skeleton, Flex, Stack, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const MovieCardSkeleton = ({ full = false }: { full?: boolean }) => {
  const isXsBreakPoint = useMediaQuery(`(max-width: ${em(575)})`);
  return (
    <Paper
      p={
        full
          ? { base: 15, xs: 24 }
          : { base: 15, xs: 20, sm: 24, md: 18, lg: 24 }
      }
    >
      <Flex
        direction={isXsBreakPoint && full ? "column" : "row"}
        justify={isXsBreakPoint ? "center" : "space-between"}
        gap={16}
      >
        <Skeleton
          w={
            full
              ? { base: "100%", xs: 380, sm: 250, md: 404 }
              : { base: 150, xs: 160, sm: 160, md: 140, lg: 160 }
          }
          h={
            full
              ? { base: 545, xs: 372, sm: 260, md: 375 }
              : { base: 155, xs: 170, sm: 170, md: 150, lg: 170 }
          }
          style={{
            borderRadius: 0,
          }}
        />
        <Stack w="100%" justify="space-between">
          <Stack w="100%" gap={10}>
            <Skeleton w="70%" h={25} />
            <Skeleton w="10%" h={16} />
            <Skeleton w="25%" h={25} />
          </Stack>
          <Stack w="80%" gap={16}>
            {full && (
              <>
                <Skeleton w="55%" h={16} />
                <Skeleton w="63%" h={16} />
                <Skeleton w="65%" h={16} />
                <Skeleton w="68%" h={16} />
              </>
            )}
            <Skeleton h={16} />
          </Stack>
        </Stack>
      </Flex>
    </Paper>
  );
};
import { Paper, Skeleton, Flex, Stack } from "@mantine/core";

export const MovieSkeleton = () => {
  return (
    <Paper p={24}>
      <Flex>
        <Skeleton w={172} h={170} style={{
          borderRadius: 0,
        }} />
        <Stack ml={16} w="100%" justify="space-between">
          <Skeleton h={25} w="70%" />
          <Skeleton w="20%" h={25} />
          <Skeleton w="20%" h={25} />
          <Skeleton w="90%" h={25} />
        </Stack>
      </Flex>
    </Paper>
  );
};

import { Paper, Skeleton, Flex, Stack } from "@mantine/core";

export const MovieSkeleton = ({ full = false }: { full?: boolean }) => {
  return (
    <Paper p={24}>
      <Flex>
        <Skeleton
          w={full ? 404 : 160}
          h={full ? 372 : 170}
          style={{
            borderRadius: 0,
          }}
        />
        <Stack ml={16} w="100%" justify="space-between">
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

import { Paper, Skeleton, Flex, Stack } from "@mantine/core";

export const MovieSkeleton = ({ full = false }: { full?: boolean }) => {
  return (
    <Paper p={24}>
      <Flex>
        <Skeleton
          w={full ? 404 : 160}
          h={full ? 352 : 170}
          style={{
            borderRadius: 0,
          }}
        />
        <Stack ml={16} w="100%" justify="space-between">
          <Stack w="100%">
            <Skeleton h={25} w="70%" />
            <Skeleton w="20%" h={20} />
            <Skeleton w="40%" h={20} />
          </Stack>
          <Stack w="50%">
            {full && (
              <>
                <Skeleton h={18} />
                <Skeleton h={18} />
                <Skeleton h={18} />
              </>
            )}
            <Skeleton w="100%" h={25} />
          </Stack>
        </Stack>
      </Flex>
    </Paper>
  );
};

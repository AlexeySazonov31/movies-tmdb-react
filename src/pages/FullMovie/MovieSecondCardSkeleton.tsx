import { Paper, Skeleton, Divider, Stack, Group } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export const MovieSecondCardSkeleton = () => {
  const { width } = useViewportSize();

  return (
    <Paper p={24}>
      <Stack gap={20}>
        <Skeleton w="30%" h={17} />
        <Skeleton
          mt={3}
          w={{ base: "100%", sm: 430, md: 500 }}
          h={{ base: (width * 9) / 16, sm: 247, md: 287 }}
        />
        <Divider />
        <Stack>
          <Skeleton w="30%" h={17} />
          <Skeleton h={12} />
          <Skeleton h={12} />
          <Skeleton h={12} />
          <Skeleton h={12} />
        </Stack>
        <Divider />
        <Stack>
          <Skeleton w="30%" h={17} />
          <Stack gap={12}>
            {[...Array(2).keys()].map((elem) => {
              return (
                <Group gap={8} key={elem}>
                  <Skeleton circle h={40} w={40} />
                  <Skeleton w={100} h={20} />
                </Group>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

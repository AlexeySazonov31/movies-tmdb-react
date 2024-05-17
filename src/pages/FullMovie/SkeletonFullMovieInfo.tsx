import { Paper, Skeleton, Divider, Stack, Group } from "@mantine/core";

export const SkeletonFullMovieInfo = () => {
  return (
    <Paper p={24}>
      <Stack gap={20}>
        <Skeleton w="30%" h={25} />
        <Skeleton mt={3} w={500} h={281} />
        <Divider />
        <Stack>
          <Skeleton w="30%" h={25} />
          <Skeleton h={12} />
          <Skeleton h={12} />
          <Skeleton h={12} />
          <Skeleton h={12} />
        </Stack>
        <Divider />
        <Stack>
          <Skeleton w="30%" h={25} />
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

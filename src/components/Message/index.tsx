import { Center, Stack, Image, Text } from "@mantine/core";
export const Message = ({
  imageSrc,
  text,
}: {
  imageSrc: string;
  text: string;
}) => {
  return (
    <Center h="40vh" mt={20}>
      <Stack justify="flex-start" align="center">
        <Image src={imageSrc} alt="error" w={311} h={252} />
        <Text size="20px" fw={600} mt={16} lh="25px" ta="center">
          {text}
        </Text>
      </Stack>
    </Center>
  );
};

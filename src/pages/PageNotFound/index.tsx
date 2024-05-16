import { Link } from "react-router-dom";

import { Button, Image, Stack, Text } from "@mantine/core";
import style from "./PageNotFound.module.scss";

export const PageNotFound = () => {
  return (
    <Stack
      align="center"
      justify="center"
      gap={0}
      px={20}
      h="100vh"
      bg="gray.1"
    >
      <Image
        src="/404.png"
        w={{ xs: 500, sm: 550, md: 656 }}
        alt="Page Not Found Image"
      />
      <Text ta="center" fw={600} size="20px" mt={45}>
        We can’t find the page you are looking for
      </Text>
      <Button
        component={Link}
        to="/"
        mt={25}
        classNames={{
          root: style.root,
          inner: style.inner,
        }}
      >
        Go Home
      </Button>
    </Stack>
  );
};

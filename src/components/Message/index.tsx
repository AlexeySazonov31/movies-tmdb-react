import { Link } from "react-router-dom";

import { Stack, Image, Text, Button } from "@mantine/core";
import style from "./Message.module.scss";

export const Message = ({
  text,
  imageSrc = null,
  btnText = null,
  height = "fit-content",
  imageWidth = 311,
  imageHeight = 252,
}: {
  text: string;
  imageSrc?: string | null;
  btnText?: string | null;
  height?: string;
  imageWidth?:
    | { base?: number; xs?: number; sm?: number; md?: number }
    | "auto"
    | number;
  imageHeight?:
    | { base?: number; xs?: number; sm?: number; md?: number }
    | "auto"
    | number;
}) => {
  return (
    <Stack justify="center" align="center" h={height} px={20}>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="error"
          w={imageWidth}
          h={imageHeight}
          pb={imageSrc === "/404.png" ? 32 : 0}
        />
      )}
      <Text size="20px" fw={600} lh="25px" ta="center">
        {text}
      </Text>
      {btnText && (
        <Button
          component={Link}
          h={40}
          to="/"
          classNames={{
            root: style.messageBtnRoot,
            inner: style.messageBtnInner,
          }}
        >
          {btnText}
        </Button>
      )}
    </Stack>
  );
};

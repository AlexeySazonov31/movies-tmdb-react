import { Message } from "../../components";

export const PageNotFound = () => {
  return (
    <Message
      imageSrc="/404.png"
      text="We can’t find the page you are looking for"
      btnText="Go Home"
      height="100%"
      imageWidth={{ xs: 500, sm: 550, md: 656 }}
      imageHeight="auto"
    />
  );
};

import { useParams } from "react-router-dom";

export const FullMovie = () => {
  const { title } = useParams();
  return <>FullMovie: {title}</>;
};

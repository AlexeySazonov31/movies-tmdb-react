import { Routes, Route } from "react-router-dom";
import { Home, FullMovie, RatedMovies, PageNotFound } from "../../pages";

export const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rated" element={<RatedMovies />} />
      <Route path="/movie/:title" element={<FullMovie />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

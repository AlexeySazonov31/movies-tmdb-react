import { Routes, Route } from "react-router-dom";

import { Home, FullMovie, RatedMovies, PageNotFound } from "../../pages";
import { Layout } from "../Layout";

export const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="rated" element={<RatedMovies />} />
        <Route path="movies/:id" element={<FullMovie />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

import { Routes, Route } from "react-router-dom";

import { Home, FullMovie, RatedMovies, PageNotFound } from "./pages";
import { SideBar } from "./components";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <SideBar />
      </AppShell.Navbar>
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rated" element={<RatedMovies />} />
          <Route path="/movie/:title" element={<FullMovie />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

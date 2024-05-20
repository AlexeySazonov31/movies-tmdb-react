import { Outlet } from "react-router-dom";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import { Navbar, Header } from "../../components";

import { AppShell, em } from "@mantine/core";

export const Layout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 85 });
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <AppShell
      navbar={{
        width: { base: 240, sm: 260, lg: 280 },
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
      }}
      header={{
        height: 85,
        collapsed: isMobile ? (opened ? false : !pinned) : true,
        offset: false,
      }}
      padding={{ base: "xs", xs: "md" }}
    >
      <Header opened={opened} toggle={toggle}/>
      <Navbar close={close} />
      <AppShell.Main pb="10vh" bg="gray.1" pt={isMobile ? "80px" : "0"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import { AppShell, Burger, Group, Image, Text, em } from "@mantine/core";
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";
import icon from "/icon-navbar.svg";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 120 });
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <AppShell
      navbar={{
        width: { base: 240, sm: 260, lg: 280 },
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
      }}
      padding="md"
      header={{
        height: 85,
        collapsed: isMobile ? (opened ? false : !pinned) : true,
        offset: false,
      }}
    >
      <AppShell.Header bg="purple.1" zIndex={9999} p={24}>
        <Group justify="space-between" >
          <Group>
            <Image w={32} h={32} src={icon} alt="Icon ArrowFlicks" />
            <Text span c="purple.5" size="24px" fw={600}>
              ArrowFlicks
            </Text>
          </Group>
          <Burger opened={opened} onClick={toggle} />
        </Group>
      </AppShell.Header>
      <Navbar toggle={toggle} />
      <AppShell.Main pb="10vh" bg="gray.1" pt={isMobile ? "100px" : "0"}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

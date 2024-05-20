import { useLocation, Link } from "react-router-dom";

import {
  AppShell,
  Text,
  Group,
  Image,
  NavLink,
  Stack,
  Box,
} from "@mantine/core";

import icon from "/icon-navbar.svg";

export const Navbar = ({ close }: { close: () => void }) => {
  const pathname = useLocation().pathname;

  return (
    <AppShell.Navbar p={24} bg="purple.1" withBorder={false}>
      <Box component={Link} w={"fit-content"} to="/" mb={80} style={{
        textDecoration: "none"
      }}>
        <Group>
          <Image w={32} h={32} src={icon} alt="Icon ArrowFlicks" />
          <Text span c="purple.5" size="24px" fw={600}>
            ArrowFlicks
          </Text>
        </Group>
      </Box>
      <Stack gap={16}>
        <NavLink
          active={pathname === "/" || /^\/movies\/.+/.test(pathname)}
          label="Movies"
          component={Link}
          to="/"
          h={42}
          onClick={close}
        />
        <NavLink
          active={pathname === "/rated"}
          label="Rated movies"
          component={Link}
          to="/rated"
          h={42}
          onClick={close}
        />
      </Stack>
    </AppShell.Navbar>
  );
};

import { AppShell, Text, Group, Image, NavLink, Stack } from "@mantine/core";
import { useLocation, Link } from "react-router-dom";
import icon from "/icon-navbar.svg";

export const Navbar = ({ toggle }: { toggle: () => void }) => {
  const pathname = useLocation().pathname;

  return (
    <AppShell.Navbar p={24} bg="purple.1" withBorder={false}>
      <Group mb={80}>
        <Image w={32} h={32} src={icon} alt="Icon ArrowFlicks" />
        <Text span c="purple.5" size="24px" fw={600}>
          ArrowFlicks
        </Text>
      </Group>
      <Stack gap={16}>
        <NavLink
          active={pathname === "/" || /^\/movies\/.+/.test(pathname)}
          label="Movies"
          component={Link}
          to="/"
          h={42}
          onClick={toggle}
        />
        <NavLink
          active={pathname === "/rated"}
          label="Rated movies"
          component={Link}
          to="/rated"
          h={42}
          onClick={toggle}
        />
      </Stack>
    </AppShell.Navbar>
  );
};

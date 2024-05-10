import {
  AppShell,
  Text,
  Group,
  Image,
  NavLink,
} from "@mantine/core";
import { useLocation, Link } from "react-router-dom";

import icon from "../../../public/icon-navbar.svg";
import style from "./Navbar.module.scss";

export const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <AppShell.Navbar p={24} bg="purple.1">
      <Group mb={100}>
        <Image h="32px" w="32px" src={icon} alt="Icon ArrowFlicks" />
        <Text c="purple.5" size="24px" fw={600}>
          ArrowFlicks
        </Text>
      </Group>

      <NavLink
        active={pathname === "/"}
        label="Movies"
        component={Link}
        to="/"
        mb={16}
        classNames={{
          root: style.navButton,
        }}
      />
      <NavLink
        active={pathname === "/rated"}
        label="Rated movies"
        component={Link}
        to="/rated"
        classNames={{
          root: style.navButton,
        }}
      />
    </AppShell.Navbar>
  );
};

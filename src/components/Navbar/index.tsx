import {
  AppShell,
  Text,
  Group,
  Image,
  NavLink,
} from "@mantine/core";
import { useLocation, Link } from "react-router-dom";
import icon from "/icon-navbar.svg";
import style from "./Navbar.module.scss";

export const Navbar = () => {
  const pathname = useLocation().pathname;

  return (
    <AppShell.Navbar className={style.root}>
      <Group mb={100}>
        <Image className={style.icon} src={icon} alt="Icon ArrowFlicks" />
        <Text className={style.logoText}>
          ArrowFlicks
        </Text>
      </Group>

      <NavLink
        active={pathname === "/"}
        label="Movies"
        component={Link}
        to="/"
        className={style.navButton}
      />
      <NavLink
        active={pathname === "/rated"}
        label="Rated movies"
        component={Link}
        to="/rated"
        className={style.navButton}
      />
    </AppShell.Navbar>
  );
};

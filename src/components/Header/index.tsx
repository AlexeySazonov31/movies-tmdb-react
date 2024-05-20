import { Link } from "react-router-dom";

import { AppShell, Group, Image, Text, Burger, Box } from "@mantine/core";
import icon from "/icon-navbar.svg";

export const Header = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  return (
    <AppShell.Header bg="purple.1" zIndex={9999} p={24}>
      <Group justify="space-between">
        <Box
          component={Link}
          w={"fit-content"}
          to="/"
          onClick={close}
          style={{
            textDecoration: "none",
          }}
        >
          <Group>
            <Image w={32} h={32} src={icon} alt="Icon ArrowFlicks" />
            <Text span c="purple.5" size="24px" fw={600}>
              ArrowFlicks
            </Text>
          </Group>
        </Box>
        <Burger opened={opened} onClick={toggle} />
      </Group>
    </AppShell.Header>
  );
};

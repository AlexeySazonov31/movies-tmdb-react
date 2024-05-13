// const [opened, { toggle }] = useDisclosure();
// import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: "sm",
        // collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Navbar />
      <AppShell.Main bg="gray.1">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

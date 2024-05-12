
import { Navbar, RouterSwitcher } from "./components";

import { AppShell } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";

export default function App() {
  // const [opened, { toggle }] = useDisclosure();

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
        <RouterSwitcher/>
      </AppShell.Main>
    </AppShell>
  );
}

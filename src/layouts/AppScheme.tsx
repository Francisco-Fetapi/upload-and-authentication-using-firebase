import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import Footer from "components/Footer";
import Header from "components/Header";
import { useRouter } from "next/router";
import { IconHome, IconHistory, IconSettings, TablerIcon } from "@tabler/icons";

interface AppSchemeProps {
  children: React.ReactNode;
}

export default function AppScheme({ children }: AppSchemeProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="md"
      asideOffsetBreakpoint="md"
      footer={<Footer />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
}

import {
  useMantineColorScheme,
  Header as HeaderMantine,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
  Group,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { IconSun, IconMoonStars, IconLogout } from "@tabler/icons";
import useAuth from "hooks/useAuth";
import useLogout from "hooks/useLogout";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UserButton } from "./UserButton";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  themeColor: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.blue[6],
  },
  alterIcon: {
    color: theme.colors.cyan[6],
  },
}));

export default function Header({ opened, setOpened }: HeaderProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const logout = useLogout();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!document.cookie.includes("uid")) {
      router.push("/iniciar-sessao");
    }
  }, []);

  return (
    <HeaderMantine height={70} p="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {user && (
          <UserButton
            email={user.email}
            image="/user-no-photo.jpg"
            name={user.name}
          />
        )}

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <h4>SISTEMA DE UPLOAD DE IMAGENS</h4>
        </MediaQuery>

        <Group>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            className={`${classes.background} ${classes.themeColor}`}
          >
            {colorScheme === "dark" ? (
              <IconSun size={20} />
            ) : (
              <IconMoonStars size={20} />
            )}
          </ActionIcon>
          <ActionIcon
            className={`${classes.background} ${classes.alterIcon}`}
            size="lg"
            onClick={logout.handle}
          >
            <IconLogout size={20} />
          </ActionIcon>
        </Group>
      </div>
    </HeaderMantine>
  );
}

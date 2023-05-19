import { useRef } from "react";
import { Text, Group, Button, createStyles } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    // position: "relative",
    // marginBottom: "15rem",
    maxWidth: "500px",
    height: "100px",
    margin: "0 auto",
  },

  dropzone: {
    // borderWidth: "0.5rem",
    // paddingBottom: "25rem",
  },

  icon: {
    // color:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[3]
    //     : theme.colors.gray[4],
  },

  control: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "-20px",
  },
}));

export function DropzoneButton() {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={"10rem"}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={"10rem"} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={"10rem"}
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black
                }
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Solte imagens aqui</Dropzone.Accept>
            <Dropzone.Reject>Imagens com menos de 5MB</Dropzone.Reject>
            <Dropzone.Idle>Carregar imagens</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mb="lg" mt="xs" color="dimmed">
            Arraste e solte as imagens aqui. Nós aceitamos apenas imagens com
            menos de 5MB.
          </Text>
        </div>
      </Dropzone>

      <div className={classes.control}>
        <Button size="md" radius="xl" onClick={() => openRef.current?.()}>
          Selecionar Ficheiros
        </Button>
      </div>
    </div>
  );
}

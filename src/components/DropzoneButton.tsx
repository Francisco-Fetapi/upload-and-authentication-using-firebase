import { useRef, useState } from "react";
import { Text, Group, Button, createStyles } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";
import PhotoPreview from "./PhotoPreview";
import useUpload from "hooks/useUpload";
import { showNotification } from "@mantine/notifications";
import { CustomLoader } from "./CustomLoader";
import convertToBase64 from "helpers/convertBase64";

const useStyles = createStyles((theme) => ({
  wrapper: {
    // position: "relative",
    // marginBottom: "15rem",
    maxWidth: "500px",
    height: "100px",
    margin: "0 auto",
    marginBottom: "300px",
  },

  dropzone: {},

  icon: {},

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
  const maxFileSize = 5; //5 MB
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const { handleUpload } = useUpload();

  function selectFiles(files: FileWithPath[]) {
    console.log(files);

    setFile(files[0]);
  }

  async function upload() {
    if (file) {
      const file64 = await convertToBase64(file);
      console.log(file64);
      handleUpload.mutate(
        {
          // file: file64 as string,
          file,
          title,
        },
        {
          onSuccess() {
            setFile(null);
            setTitle("");
            showNotification({
              title: "Imagem carregada.",
              message: "A sua imagem foi carregada com sucesso.",
              color: "green",
            });
          },
        }
      );
    }
  }

  return (
    <>
      {!file && (
        <div className={classes.wrapper}>
          <Dropzone
            openRef={openRef}
            onDrop={selectFiles}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]}
            maxSize={maxFileSize * 1024 ** 2}
            multiple={false}
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
                  <IconX
                    size={"10rem"}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
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
                Arraste e solte as imagens aqui. Nós aceitamos apenas imagens
                com menos de 5MB.
              </Text>
            </div>
          </Dropzone>

          <div className={classes.control}>
            <Button size="md" radius="xl" onClick={() => openRef.current?.()}>
              Selecionar Ficheiros
            </Button>
          </div>
        </div>
      )}
      {file && !handleUpload.isLoading && (
        <PhotoPreview
          file={file}
          title={title}
          setFile={setFile}
          setTitle={setTitle}
          upload={upload}
        />
      )}

      {handleUpload.isLoading && (
        <div style={{ textAlign: "center" }}>
          {CustomLoader}
          <Text size="xs" color="dimmed" align="center">
            Carregando foto...
          </Text>
        </div>
      )}
    </>
  );
}

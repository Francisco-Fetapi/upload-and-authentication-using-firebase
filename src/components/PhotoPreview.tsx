import { Text, Group, Button, createStyles, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import CardImage from "./CardImage";

interface PhotoPreviewProps {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  upload: () => void;
}

const useStyles = createStyles((theme) => ({
  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
}));

export default function PhotoPreview({
  title,
  file,
  setFile,
  setTitle,
  upload,
}: PhotoPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>("");
  const { classes } = useStyles();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, []);
  return (
    <div
      style={{
        maxWidth: "400px",
        height: "300px",
        margin: "0 auto",
        marginBottom: "150px",
      }}
    >
      <Text size="lg" weight="bold" mb={10} align="center">
        Preview da Foto
      </Text>
      {previewUrl && (
        <CardImage
          picture={{
            date: new Date().toString(),
            title,
            image: previewUrl as string,
          }}
          preview
        />
      )}
      <TextInput
        label="Legenda"
        placeholder="Legenda da imagem"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        radius="md"
        maxLength={80}
      />
      <Group
        mt={10}
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          radius="xl"
          size="md"
          className={classes.control}
          onClick={upload}
        >
          Carregar
        </Button>
        <Button
          variant="default"
          radius="xl"
          size="md"
          className={classes.control}
          onClick={() => setFile(null)}
        >
          Cancelar
        </Button>
      </Group>
    </div>
  );
}

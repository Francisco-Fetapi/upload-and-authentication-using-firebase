import { Card, Text, AspectRatio, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export interface Picture {
  title: string;
  image: string;
  date: string;
}

export interface CardImageProps {
  picture: Picture;
}

export default function CardImage({ picture }: CardImageProps) {
  const { classes } = useStyles();
  return (
    <Card
      key={picture.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={picture.image} alt="Imagem" />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {picture.date}
      </Text>
      <Text
        className={classes.title}
        mt={5}
        color={!picture.title ? "red" : undefined}
      >
        {picture.title || "Imagem sem titulo!"}
      </Text>
    </Card>
  );
}

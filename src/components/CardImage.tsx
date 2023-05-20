import { Card, Text, AspectRatio, createStyles } from "@mantine/core";
import { formatDate } from "helpers/formatDate";
import { useHasMounted } from "hooks/useHasMonted";

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
  preview?: boolean;
}

export default function CardImage({
  picture,
  preview = false,
}: CardImageProps) {
  const { classes } = useStyles();
  const hasMonted = useHasMounted();

  if (!hasMonted) {
    return <div></div>;
  }
  return (
    <Card
      key={picture.title}
      p="md"
      radius="md"
      component="a"
      href={picture.image}
      target="__blank"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={picture.image} alt="Imagem" />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {formatDate(new Date(picture.date))}
      </Text>
      {picture.title && (
        <Text className={classes.title} mt={5}>
          {picture.title}
        </Text>
      )}
      {!picture.title && !preview && (
        <Text className={classes.title} mt={5}>
          SEM LEGENGA
        </Text>
      )}
    </Card>
  );
}

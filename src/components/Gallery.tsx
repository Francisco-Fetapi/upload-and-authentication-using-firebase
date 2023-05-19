import { SimpleGrid, Container } from "@mantine/core";
import CardImage, { Picture } from "./CardImage";

interface GalleryGridProps {
  pictures: Picture[];
}

export default function GalleryGrid({ pictures }: GalleryGridProps) {
  const cardImages = pictures.map((picture) => (
    <CardImage picture={picture} key={picture.image} />
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cardImages}
      </SimpleGrid>
    </Container>
  );
}

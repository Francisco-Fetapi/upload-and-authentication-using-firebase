import { Text } from "@mantine/core";
import { apiRoutes } from "lib/axios";
import { GetImagesApiResponse } from "pages/api/get-images";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Picture } from "./CardImage";
import GalleryGrid from "./Gallery";

export default function AllPhotos() {
  const pictures = useQuery(
    "pictures",
    () => {
      return apiRoutes.get<GetImagesApiResponse>("/get-images");
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  const picturesDocuments = pictures.data?.data.images || [];
  const imagesParsed: Picture[] = useMemo(() => {
    return picturesDocuments.map((pic) => {
      return { ...pic, image: pic.fullUrl };
    });
  }, [picturesDocuments]);

  if (pictures.isLoading) {
    return (
      <Text color="dimmed" mb="lg" align="center" size="xs">
        Carregando fotos...
      </Text>
    );
  }

  return (
    <div>
      {pictures.isRefetching && (
        <Text color="dimmed" mb="lg" align="center" size="xs">
          Carregando mais fotos...
        </Text>
      )}
      <GalleryGrid pictures={imagesParsed} />;
    </div>
  );
}

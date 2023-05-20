import { apiRoutes } from "lib/axios";
import { GetImagesApiResponse } from "pages/api/get-images";
import { useQuery } from "react-query";
import { Picture } from "./CardImage";
import GalleryGrid from "./Gallery";

export default function AllPhotos() {
  const pictures = useQuery("pictures", () => {
    return apiRoutes.get<GetImagesApiResponse>("/get-images");
  });

  if (pictures.isLoading) {
    return <p>Carregando fotos...</p>;
  }

  const picturesDocuments = pictures.data?.data.images || [];

  const imagesParsed: Picture[] = picturesDocuments.map((pic) => {
    return { ...pic, image: pic.fullUrl };
  });

  return <GalleryGrid pictures={imagesParsed} />;
}

import { Image } from "entities/Image";
import { apiRoutes } from "lib/axios";
import { HandleSaveImageApiResponse } from "pages/api/save-image";
import { useMutation } from "react-query";

interface Request extends Omit<Image, "date" | "uid"> {}

export default function useImageStorage() {
  const handleSaveImage = useMutation(async ({ fullUrl, title }: Request) => {
    return apiRoutes.post<HandleSaveImageApiResponse>("/save-image", {
      fullUrl,
      title,
      date: new Date().toString(),
    });
  });

  return { handleSaveImage };
}

import { NextApiRequest, NextApiResponse } from "next";
import getAllImagesByImage, {
  ImageDocument,
} from "services/getAllImagesByUser";

export interface GetImagesApiResponse {
  images: ImageDocument[];
}

async function saveImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const images = await getAllImagesByImage(req.headers.uid as string);

    res.status(201).send({ images });
  } catch (e: any) {
    res.status(200).send({ msg: e.message });
  }
}

export default saveImage;

import { NextApiRequest, NextApiResponse } from "next";
import { User } from "entities/User";
import { saveImageToFirebase } from "services/saveImageToFirebase";

interface Request {
  uid: string;
  fullUrl: string;
  title: string;
}

export interface HandleSaveImageApiResponse {
  msg: string;
}

interface ResponseError {
  error: string;
}

async function saveImage(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { fullUrl, title } = <Request>body;

  const uid = req.headers.uid as string;
  try {
    const date = new Date().toString();
    await saveImageToFirebase({ fullUrl, title, uid, date });

    res.status(201).send({ msg: "Image Saved." });
  } catch (e: any) {
    res.status(200).send({ msg: e.message });
  }
}

export default saveImage;

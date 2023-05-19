import { NextApiRequest, NextApiResponse } from "next";
import { User } from "entities/User";

interface Request {
  user: User;
}

export interface HandleUploadApiResponse {
  msg: string;
}

interface ResponseError {
  error: string;
}

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  // const {

  // } = <Request>body;

  // try {
  // const result = await uploadUserWithEmailPassword({ email, password });
  // const user = result.user;
  //   console.log(body);

  //   res.status(201).send({ msg: "User logged." });
  // } catch (e: any) {
  //   res.status(200).send({ msg: e.message });
  // }

  console.log(body);
  res.status(201).send({ msg: "File uploaded." });
}

export default upload;

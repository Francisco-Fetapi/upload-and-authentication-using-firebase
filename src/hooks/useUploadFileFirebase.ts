import { ref as storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import useFirebase from "./useFirebase";

export default function useUploadFileFirebase() {
  const { storage } = useFirebase();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const uploadFirebase = async (file: File) => {
    const { name, type } = file;
    const ref = storageRef(storage, name);
    const result = await uploadFile(ref, file, {
      // contentType: "image/jpeg",
      contentType: type,
    });
    console.log(result);
  };

  return { uploadFirebase, uploading, snapshot, error };
}

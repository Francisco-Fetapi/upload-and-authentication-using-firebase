import { firebaseDb } from "config/firebase.config";
import { Image } from "entities/Image";
import { getDocs, collection, query, where } from "firebase/firestore";

export interface ImageDocument extends Image {
  id: string;
}

export default async function getAllImagesByImage(uid: string) {
  const imagesCollection = collection(firebaseDb, "images");
  const q = query(imagesCollection, where("uid", "==", uid));

  const imageSnapshot = await getDocs(q);

  const images: ImageDocument[] = [];
  imageSnapshot.forEach((doc) => {
    images.push({
      id: doc.id,
      ...(doc.data() as Image),
    });
  });

  return images;
}

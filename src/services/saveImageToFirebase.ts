import { firebaseDb } from "config/firebase.config";
import { Image } from "entities/Image";
import { addDoc, collection, DocumentData } from "firebase/firestore";

interface ImageDoc extends Partial<Image>, DocumentData {}

export async function saveImageToFirebase(image: Image) {
  const { date, fullUrl, title, uid } = image;

  const docRef = await addDoc(collection(firebaseDb, "images"), {
    date,
    fullUrl,
    title,
    uid,
  } as ImageDoc);

  return { docId: docRef.id };
}

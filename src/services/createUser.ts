import { firebaseDb } from "config/firebase.config";
import { User } from "entities/User";
import { updateProfile } from "firebase/auth";
import { addDoc, collection, DocumentData } from "firebase/firestore";
import { createUserWithEmailPassword } from "./createUserWithEmailAndPassword";

interface UserDoc extends Partial<User>, DocumentData {
  userid: string;
}

export async function createUser(user: User) {
  const userRef = await createUserWithEmailPassword(user);

  if (userRef) {
    await updateProfile(userRef, {
      displayName: user.name,
    });
  }
  const { email, name } = user;

  const docRef = await addDoc(collection(firebaseDb, "users"), {
    userid: userRef?.uid,
    email,
    name,
  } as UserDoc);

  return { docId: docRef.id, userRef };
}

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {auth} from './firebaseConfig'



export const registerUser = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
   await updateProfile(userCredential.user, {displayName: name})
   const token = await userCredential.user.getIdToken()
   return {user: userCredential.user, token}
}

export const signInUser = async(email: string, password: string,) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const token = await userCredential.user.getIdToken()
  return {user: userCredential.user, token}
}

export const logoutUser = async() => {
  await signOut(auth)
}

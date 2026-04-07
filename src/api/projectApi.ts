import { collection, updateDoc, deleteDoc, doc, query, where, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import type { Project } from "@/types/projects"

export const addProjectToFirestore = async(project: Project, userId: string) => {
  await setDoc(doc(db, 'projects', project.id), {
    ...project,
    userId
  })
}

export const updateProjectToFirestore = async(project: Project) => {
  await updateDoc(doc(db, 'projects', project.id), {
    ...project,
  })
}

export const deleteProjectToFirestore = async(project: Project) => {
  await deleteDoc(doc(db, 'projects', project.id))
}

export const subscribeToProjects = (userId: string, callback: (project: Project[]) => void ) => {
  const q = query(collection(db, 'projects'), where('userId', '==', userId))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((s) => {
     return s.data() as Project
    })
    callback(projects)
  })


  return unsubscribe
}
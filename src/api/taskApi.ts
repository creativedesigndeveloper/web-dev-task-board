import { collection, updateDoc, deleteDoc, doc, query, where, onSnapshot, setDoc, arrayUnion } from "firebase/firestore"
import { db } from "./firebaseConfig"
import type { SubTask, Task } from "@/types/task"

export const addTaskToFirestore = async(task: Task, userId: string) => {
  await setDoc(doc(db, 'tasks', task.id), {
    ...task,
    userId
  })
}

export const addSubTaskToFirestore = async( task: Task, subtask: SubTask) => {
  await updateDoc(doc(db, 'tasks', task.id), {
    subTasks: arrayUnion(subtask)
  })
}

export const updateTaskToFirestore = async(task: Task) => {
  await updateDoc(doc(db, 'tasks', task.id), {
    ...task,
  })
}

export const deleteTaskToFirestore = async(task: Task) => {
  await deleteDoc(doc(db, 'tasks', task.id))
}

export const subscribeToTasks = (userId: string, callback: (task: Task[]) => void ) => {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((s) => {
     return s.data() as Task
    })
    callback(tasks)
  })


  return unsubscribe
}
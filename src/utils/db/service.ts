import {
    addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";
import { cloneElement } from "react";

const firestore = getFirestore(app);
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, is: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, is));
  const data = snapshot.data();
  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email))
  const snapshot = await getDocs(q)
  const data  = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if (data) {
    console.log(data)
    return data[0]
  }else{
    return null
  }
} 

export async function signUP(
  userData: { email: string; fullname: string; password: string, role?: string },
  callback: Function
) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if(data.length > 0) {
        callback({status: false, message: 'Email sudah terdaftar'})
    }else{
        userData.password = await bcrypt.hash(userData.password, 10)
        userData.role = 'member'
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({status: true, message: 'Register Sucsess'})
        }).catch((error) => {
            callback({status: false, message: error})
        })
    }
}


export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email))

  const snapshot = await getDocs(q)

  const data: any = await snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  if(data.length > 0) {
    userData.role = data[0].role
    await updateDoc(doc(firestore, "users", data[0].id), userData).then(() => {
      callback({status: true, message: "Sign In With Google Sucsess", data: userData})
    }).catch(() => {
      callback({status: false, message: "Sign In With Google Failed"})
    })
  }else{
    userData.role = 'member'
    await addDoc(collection(firestore, "users"), userData).then(() => {
      callback({status: true, message: "Sign In With Google Sucsess", data: userData})
    }).catch (() => {
      callback({
        status: false,
        message: "Sign In With Google Failed"
      })
    })
  }
} 
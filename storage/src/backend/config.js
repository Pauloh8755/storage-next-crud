import {initializeApp} from "firebase/app"
import { getStorage } from "firebase/storage"
import firebase from "firebase/compat/app"

//dados de configuração
const firebaseConfig = {
    apiKey: "AIzaSyDdhQgKoplyUER4UmZh11BIN_3ZaaXJPBY",
    authDomain: "storage-crud-a5dc0.firebaseapp.com",
    projectId: "storage-crud-a5dc0",
    storageBucket: "storage-crud-a5dc0.appspot.com"
 
}
//inicializando aplicação
const app = initializeApp(firebaseConfig)
//recebendo storage
const storage = getStorage(app)

export{
    app,storage,firebase
}
        
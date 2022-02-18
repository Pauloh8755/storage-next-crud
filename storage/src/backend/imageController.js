import {getDatabase, onValue, ref,set,get,child, push} from "firebase/database"
import { v4 as uuidv4 } from 'uuid';

//function para salvar dados no banco
const salvar = (title, url) =>{
    const db = getDatabase()
    //retornando resolve
    return new Promise((resolve)=>{
      //set(local onde será salvo, objeto)
      set(ref(db, 'image/' + title),{
        //regatar id unico
        id: uuidv4(),
        title: title,
        url: url
      }).then(()=>{
        resolve(true)
      }).catch((error)=>{
        console.log(error)  
        resolve(false)
      })
    })
}

const buscar = async() => {
  let data = []
  const dbRef = ref(getDatabase())
  const snapshot = await get(child(dbRef,"image/"))
  if(snapshot.exists()){
     for(let i in snapshot.val()){
       data.push({...snapshot.val()[i]})
     }
  }
  return data
}

export{
  salvar as default,
  buscar
} 

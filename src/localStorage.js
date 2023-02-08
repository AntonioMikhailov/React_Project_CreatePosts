import  { useEffect, useState } from "react";
 
  export default function useLocalStorage(initialData, key) {
    const getUsers = ()=> { 
      const storage = localStorage.getItem(key)
       if(storage) { 
      return JSON.parse(storage)
       } else {
       return initialData
        }    }
       const [users, setUsers] = useState(getUsers)
  useEffect(()=> {   
  localStorage.setItem(key,  JSON.stringify(users))  }, [key,users])
   return [users, setUsers] 
}
 

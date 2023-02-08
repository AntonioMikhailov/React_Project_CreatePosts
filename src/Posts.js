import React, {  useRef, useState } from "react";
import { useEffect } from "react";
import "./App.scss";
import ItemPost from "./ItemPost";
import useLocalStorage from "./localStorage";
// можно также получить БД с удаленного API, не суть
export default function Posts2LS() {
   const data = [
    { id: 3, name: "Anna", post: '', liked: false, date: Date.now() },  
    { id: 2, name: "Sergey", post: '', liked: false, date:  Date.now() }, 
    { id: 1, name: "Boris", post: '', liked: false, date:  Date.now()},  
  ];
 
  const [liked, setLiked] = useState(0)
  const [searchUser, setSearchUser] = useState('')
  // LS подключаем
  const [users, setUsers] = useLocalStorage(data, 'users')
  const newUser = useRef()
  const [sortPosts, setSortPosts] = useState('')
 
  // Добавляем Юзера
  function addNewUser(e) { 
    e.preventDefault()
    let trimmed = newUser.current.value.trim() 
    let firstSymbolName = trimmed[0].toUpperCase() + trimmed.slice(1)
    // или через RegExp // let firstSymbolName = trimmed.replace(/^./, trimmed[0].toUpperCase());
   
    setUsers(()=> {
    return [ ...users,{id: users.length+1, name: firstSymbolName, post: '', liked: false, date: new Date().toISOString()} ]
    })
    newUser.current.value = ''
  }
 
useEffect(()=> {
  function handleSort( ) {    
    let sortedArr = [...users].sort((a,b)=> sortPosts === 'liked' || sortPosts === 'post' ? b[sortPosts] > a[sortPosts] ? 1 : -1 : a[sortPosts] > b[sortPosts] ? 1 : -1 )
  setUsers(sortedArr)
  
  }
   handleSort()
},[sortPosts ])  
    return (
    <>
 <div className='header' ><span>All users:</span> {users.length} <span>Liked:</span> {liked}
</div>
<hr />
<h3>Add User</h3>
<form action="">
  <input ref={newUser} type="text" />
  <button onClick={addNewUser}>Add new User</button>
</form>
<h3>Find by User&Post</h3>
<form action="">
  <input onChange={(e)=> setSearchUser(e.target.value ) }  type="text" value={searchUser}  />
  
</form>
<div className="searchRow">
<h3>Sort by</h3>
<select onChange={(e)=> setSortPosts(e.target.value)} name="" id="">
 <option value="" > - - -</option>
<option value="name" >name</option>
<option value="id">id</option>
<option value="post">post</option>
    <option value="liked" >liked</option>
    <option value="date" >date</option>
        </select>
      </div>
     
      {
  users.filter((item)=> {
        return item.name.toLowerCase().includes(searchUser.toLowerCase()) || item.post.toLowerCase().includes(searchUser.toLowerCase())
  }).map((item, i)=> {
    return (
      <ItemPost
      key={i} 
      setUsers={setUsers} 
      users={users} 
      setLiked={setLiked} 
      liked={liked} 
      item={item} />
    )
  })
  }
    </>
  );
}

 
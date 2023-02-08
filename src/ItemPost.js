import React, { useEffect, useRef } from 'react'
export default function ItemPost({ setUsers, users, setLiked, item }) {
 
  const inputRef = useRef()
 // Тоглим Лайки 
  function handleLike(item) {
    setUsers((prev) => {
      return prev.map((itemName) => {
        if (itemName.name === item.name) {
          return { ...itemName, liked: !itemName.liked };
          // itemName.liked = !itemName.liked //или так
        }
        return itemName;
      });
    });
  }
  // меняем отображение лайков в разметке 
  useEffect(()=> {
    setLiked( ()=> {
    return users.filter((item)=> {
    return (item.liked)  
      }).length
    // return users.filter(item => item.liked).length // или так - короче ))
   
    })  
  },[users])  
// Удаляем пост
 function handleDelete(item) { 
  console.log(item);
  setUsers((prev) => {
    return prev.filter((itemName) => itemName.name !== item.name);
  })   
 }
  // Добавляем Пост
function addPost(e, inputRef, item) {
  e.preventDefault()
  if(inputRef.current.value) {
    setUsers(()=> {
      return users.map((itemName) => {
   if (itemName.name === item.name) {
          return { ...itemName, post: inputRef.current.value  };
        }
        return itemName;
      });
    });
    inputRef.current.value = ''
  } 
 }
// очищаем пост
function clearPost() { 
  setUsers((prev)=> {
    return prev.map((itemName) => {
      if (itemName.name === item.name) {
        return { ...itemName, post: ''  };
    }
      return itemName;
    });
  });
}
  return (
 <>
     <div  className="postRow">
      <div className='postRow__name' >{item.name} </div>
     <div className='inputRow' >
    <form >
    <input ref={inputRef} type="text" />
     <button  onClick={(e) => addPost(e, inputRef, item)}>Add Post</button>
    </form>
     </div>
     <div className='postRow__posts' >
     <div>New Post: {item.post}  </div>
      <button onClick={() => handleLike(item)}  className={item.liked === true ? "active postItem" : "postItem"} >Like</button>
      <button onClick={() => handleDelete(item)} >Delete User</button>
      <button onClick={() => clearPost(item)} >Clear Post</button>
      </div>
   </div>
 </>
  )
}

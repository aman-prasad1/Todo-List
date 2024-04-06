import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const App = () => {
  const i = useRef(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])


  const getTodos = async ()=>{
    let req = await fetch('http://localhost:3000/')
    let arr = await req.json()
    settodos(arr)
  }

  useEffect(() => {
    getTodos()
    
  }, [])
  

  
  const handleChange = (e)=>{
    settodo(e.target.value)
  }
  const handleAdd = async ()=>{
    if(todo.length > 0 && todo.trim().length > 0){
      let res = await fetch('http://localhost:3000/', {method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify({id: uuidv4(),todo:todo, isCompleted:false})})

      getTodos()
      settodo("")
    }
  }
  const handleDelete = async (i)=>{
    let toDel = todos[i]
    let id = toDel.id
    let res = await fetch('http://localhost:3000/', {method:'DELETE', headers:{"Content-Type":"application/json"}, body:JSON.stringify({...todo, id})})
    getTodos()
  }
  const handleCheckbox = async (e) => {
    // e.target.value = !e.target.value
    let ind = e.target.name
    let arr = [...todos]
    let data = {
      id : arr[ind].id,
      todo : arr[ind].todo,
      isCompleted : !arr[ind].isCompleted
    }
    let res = await fetch('http://localhost:3000/', {method:'PUT', headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    getTodos()
    console.log(data)
    // arr[ind].isCompleted = !arr[ind].isCompleted
    // settodos(arr)
  }
  
  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black h-[100vh] w-[100vw]'>
        <div className="h-4/5 w-2/4 pl-20 bg-slate-300 border rounded-md">
          <p className='text-4xl font-bold m-6 ml-0'>To-Do List</p>

          <div className='flex mb-5'>
            <input onChange={handleChange} spellCheck={false} value={todo} className='w-[80%] ' type="text" />
            <button onClick={handleAdd} className='bg-orange-400'>Add</button>
          </div>

          {todos.map((item, index)=>{
            return <div key={`key-${index}`} className='w-[88%] h-10 ml bg-slate-400 border rounded-lg flex justify-between px-4'>
              <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={index} value={item.isCompleted} />
              <span className={'w-full, pt-1 mx-4 ' + (item.isCompleted? "line-through": "")}>{item.todo}</span>
              <button onClick={()=>{handleDelete(index)}}>delete</button>
            </div>
          })}
        </div>
        {/* {'w-full, pt-1 mx-4 ' + (item.isCompleted? "line-through": "underline...")} */}
    </div>
  )
}

export default App

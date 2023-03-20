import {useRef} from 'react'

const Todo = ({todo, id, removeTodo}) => {

  const todoRef = useRef()
  const buttonRef = useRef()

  const deleteTodo = (e) => {
    todoRef.current.classList.add('fade-away');
  }

  const remove = (e) => {
    deleteTodo()
    setTimeout(() => {
      removeTodo(buttonRef.current.getAttribute('data-id'))
    }, 1000)
  }

  return (
    <div ref={todoRef} className='todo'>
      <p>{todo}</p>
      <button ref={buttonRef} onClick={remove} data-id={id}><i class="fa-solid fa-trash-can-arrow-up"></i></button>
    </div>
  )
}


export default Todo

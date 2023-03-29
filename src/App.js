import { useState, useEffect } from 'react'
import './App.css';
import Time from './components/Time.js'
import Greeting from './components/Greeting.js'
import Greeting2 from './components/Greeting2.js'
import Todo from './components/Todo';

function App() {

  let time = new Date().toLocaleTimeString();
  let hour = new Date().getHours();

  const [currentTime, setCurrentTime] = useState(time);
  const [currentHour, setCurrentHour] = useState(hour);
  const [period, setPeriod] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState(
    !localStorage.getItem("todoList")
      ? []
      : JSON.parse(localStorage.getItem("todoList"))
  );

  //Time

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    hour = new Date().getHours();
    setCurrentTime(time)
    setCurrentHour(hour)
  }

  setInterval(updateTime, 1000)

  //Greeting

  useEffect(() => {
    setPeriod("")
    //document.body.classList.remove('morning')
    //document.body.classList.remove('day')
    //document.body.classList.remove('night')
    document.body.className = ''
    if (parseInt(currentHour) < 10) {
      setPeriod("Jó reggelt, ")
      document.body.classList.add('morning')
    } else if (parseInt(currentHour) < 18) {
      setPeriod("Jó napot, ")
      document.body.classList.add('day')
    } else {
      setPeriod("Jó estét, ")
      document.body.classList.add('night')
    }
  }, [currentHour])


  //Todos

  useEffect(() => {
    JSON.parse(localStorage.getItem("todoList"))
    if (todoList) {
      setTodoList(todoList)
      console.log("parsed")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))
    console.log("added")
  }, [todoList])



  const saveTodo = () => {

    JSON.parse(localStorage.getItem("todoList"))
    if (todoList) {
      setTodoList(todoList)
    }

    setTodoList([...todoList, {
      todo: todoInput,
      id: Math.floor(Math.random() *10000)
    }])

    //localStorage.setItem("todoList", JSON.stringify(todoList))
  }

  const removeTodo = (id) => {
    
    todoList.forEach((todo, index) => {
      if (todo.id === +id) {
        console.log(id)
        todoList.splice(index, 1)
      }
    });

    localStorage.setItem("todoList", JSON.stringify(todoList));
  }


  return (
    <div className="App">
      <div className="container">
        <Time
          currentTime={currentTime}
        />
        <Greeting
          period={period}
        />
        <div className="todolist">
          <h3>Milyen terveid vannak mára?</h3>
          <input type="text" placeholder='Feladat...' value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.keyCode == "13") {
                saveTodo()
                setTodoInput("")
              }
            }}
          />
          <div className="todo-container">
            {
              todoList.map(todo => {
                return (
                  <Todo
                    todo={todo.todo}
                    id={todo.id}
                    key={todo.id}
                    removeTodo={removeTodo}
                  />
                )
              })
            }
          </div>

        </div>
      </div>
    </div>

  );
}

export default App;

import './App.css';
import React, { useState } from 'react';

function TodoList(){
  const [value,SetValue] = useState('')
  const [todos,SetTodos] = useState([])
  const [block,SetBlock] = useState(false)
  const [trueValue,SetValueTrue] = useState(0)
  const [trueTodos,SetTrueTodos] = useState([])
  // проверка инпута
  function CheckingInput(e){
      SetValue(e.target.value)
  }
  // передача данных с инпута
  function PassingValue(){
    if(value !== ''){
      SetTodos([...todos, value])
      SetValue('')
    }
  }
// удаление при клике 
  function DeleteItem(index){
    const newTodos = [...todos]
    newTodos.splice(index,1)
    SetTodos(newTodos)
  }
  // удаление всех элементов
  function DeleteTodo(){
    let remTodo = [...todos]
    remTodo = []
    SetTodos(remTodo)
    SetTrueTodos(remTodo)
    SetValueTrue(0)
    SetBlock(!block)
  }
  // выполненые 
  function CompletedValue(index,todo){
    SetValueTrue(trueValue + 1)
    let newTodos = [...todos]
    let newTrueTodo = []
    newTrueTodo.push(todo)
    newTodos.splice(index, 1)
    SetTodos(newTodos)
    SetTrueTodos([...trueTodos, ...newTrueTodo])
  }

  // удаляение в выполненых
  function DeleteTrueItem(index){
    SetValueTrue(trueValue - 1)
    let newTodos = [...trueTodos]
    newTodos.splice(index,1)
    SetTrueTodos(newTodos)
  }

  const perceng = Math.round(trueValue / [todos.length + trueTodos.length] * 100)
    return(
      // 
    <div className='TodoBlocks'>
      <div className='ContentsBlocks'>

        {/* Clear list */}
        <div className='ClearBlock'>
        <h3 onClick={() => SetBlock(!block)} className='ClearBtn'>...</h3>
        {block && (
          <h3 onClick={DeleteTodo} className='ClearTitle'>Удалить весь список</h3>
        )}
        </div>

        {/* input create */}
      <div className='CreateBlock'>
        <input value={value} onChange={CheckingInput} 
        placeholder='Новая задача...'
        className='CreateInput'>
        </input>
        <button onClick={PassingValue} className='CreateBtn'>Добавить</button>
      </div>

        {/* proggress */}
        <div className=''>
        <h3 className='ProgressTitle'>Progress {trueValue > 0 ? perceng : 0}%</h3>
        <div className='BlockProgress'>
          <div className='Progress' style={{width: `${trueValue > 0 ? perceng : 0}%`}}></div>
        </div>
        </div>

        {/* todo list */}
        <div className='Content'>
          <div><h3 className='ContentAllTitle'>Все</h3></div>
          <ul className='ContentUl'>
            {todos.map((todo , index) => (
              <div className='ContentBlocksAllItem'>
              <li className='TodoLi' key={index}>{todo}</li>
              <div className='TodoBlockBtn'>
               <button className='TodoBtnDelete' onClick={() => DeleteItem(index)}>X</button>
               <button className='TodoBtnTrue' onClick={() => CompletedValue(index,todo)}>✓</button>
              </div>
               </div>
            ))}
          </ul>

          {/* trueItem */}
          <div>
            <ul className='ContentUl'>
              {trueTodos.map((item, index) => (
                <div className='ContentBlocksAllItemTrue'>
                  <li className='TodoLiTrue' key={index}>{item}</li>
                  <button className='TodoBtnDelete' onClick={() => DeleteTrueItem(index)}>X</button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
}

function App() {
  return (
    <div className="App">
      <TodoList></TodoList>
    </div>
  );
}

export default App;

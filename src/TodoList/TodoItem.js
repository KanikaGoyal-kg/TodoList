import React, { useState } from 'react';
import { Button, Form, Input, ListGroup } from 'reactstrap';
import './todoStyle.css'

export const TodoItem = ({
    todoItem,
  onRemoveTodo,
  onClickAdd,
  setTodoList,
  saveTodoList,
  todoList
    

}) => {
    const [saveValue, setSaveValue] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [editTodoIds, setEditTodoIds] = useState([])

const onClickEdit = todoItem => {

    let newTodoList = todoList.map(todo => todo.id).includes(todoItem.id)
    
    if(newTodoList){
        setSaveValue(todoItem.text)
    }
    setIsEdit(true)
    setEditTodoIds([...editTodoIds, todoItem.id])
}

const onClickSave =(event, todoItem) => {
    let newTodoList = todoList.map(todo=>
     todo.id ===todoItem.id ? { ...todo, text: saveValue} :todo   )
     event.preventDefault()
     setTodoList(newTodoList)
     setSaveValue("")
     saveTodoList(newTodoList)
     setEditTodoIds([])
     setIsEdit(false)

}

const onClickCancel = () => {
    setIsEdit(false)
    setEditTodoIds([])
}
const onChangeSaveText = event => setSaveValue(event.target.value)

let findAllMatchIds = editTodoIds
.map(todoIds => todoIds)
.includes(todoItem.id)
if(isEdit && findAllMatchIds){
    return(
        <Form className="d-flex todo-container margin-top-02 margin-bottom-02" onSubmit={onClickAdd}
        >
            <Input 
            type="text"
            placeholder="Add tasks"
            value={saveValue}
            onChange={onChangeSaveText}
            className="todo-input input"
            />
            <Button 
          color="secondary"
          onClick={event => onClickSave(event, todoItem)}
          type="submit"
          disabled={!saveValue}
          className="margin-right-02 button"
        >
          Save
        </Button>
        <Button className="button"
          color="secondary"
          onClick={onClickCancel}
          type="submit"
        >
          Cancel
        </Button>
        </Form>
    )
}
    return(
        <div className="todo-list-item-container">
        <ListGroup  className="todo-list-item d-flex justify-content-between align-items-center">
            <span >{todoItem.text}</span>
            <button className="text-danger cursor-pointer"
                onClick={() => onRemoveTodo(todoItem.id)}

                >
                delete
            </button>
        </ListGroup>
        <div>
            <Button 
            type="submit"
            className="text-decoration-none"
            onClick={() => onClickEdit(todoItem)}
            
            >
                Edit
            </Button>
        </div>
        </div>
    )
}

// export default TodoItem
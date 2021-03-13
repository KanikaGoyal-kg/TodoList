import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Input, ListGroup, Row } from "reactstrap";
import { TodoItem } from '../TodoList/TodoItem'
import './todoStyle.css'

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    getTodoList()
  }, [])

  const getId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

  const onChangeText = (event) => {
    setInputValue(event.target.value);
  };

  const onClickAdd = (event) => {
     
    event.preventDefault()
    let todoItem = {
        id: getId(),
        text: inputValue
    }

    setTodoList ([todoItem, ...todoList])
    setInputValue("")
    saveTodoList ([todoItem, ...todoList])
  }
  
  const onRemoveTodo = id =>{
      let removeTodo = todoList.filter(todoItem => todoItem.id !==id)
      setTodoList(removeTodo)
      saveTodoList(removeTodo)
  }
  

  const saveTodoList = todoList =>
    localStorage.setItem("todoList", JSON.stringify(todoList))
    
  const getTodoList = () =>
    JSON.parse(localStorage.getItem("todoList"))
    ? setTodoList(JSON.parse(localStorage.getItem("todoList")))
    : null

  return (
    <Container fluid className="container">
      <Row>
        <Col>
          <h1 className="heading">Todo List</h1>
        </Col>
      </Row>
      <Row className="content">
        <Col>
          <Form onSubmit={onClickAdd}>
            <Input className="input"
              type="text"
              placeholder="Add tasks"
              onChange={onChangeText}
              value={inputValue}
            />
            <Button className="button"
            onClick={onClickAdd}
            type="submit"
            disabled={!inputValue}
            >Add
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
          <Col>
          <ListGroup>
              {todoList.length
              ? todoList.map((todoItem, index) => {
                  return(
                      <TodoItem
                    key={index}
                    todoItem={todoItem}
                    onRemoveTodo={onRemoveTodo}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    saveTodoList={saveTodoList}
                    />
                  )
              })
              :null
            }
          </ListGroup>
          </Col>
      </Row>
    </Container>
  );
};

export default ToDoList;

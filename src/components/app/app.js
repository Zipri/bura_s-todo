import React, { Component } from 'react';
import { Collapse } from 'antd';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css'
import 'antd/dist/antd.css';
import ItemAddForm from "../item-add-form";

const { Panel } = Collapse;

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem('Learn Kamasutra'),
      this.createTodoItem('Build Awesome React App'),
      this.createTodoItem('Drink Vodka'),
      this.createTodoItem('fuck the world'),
    ]
  };

  createTodoItem(label) {

    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(
        el => el.id === id
      );

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newTodoData
      }
    })
  };

  addItem = (text) => {

    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newTodoData = [
        ...todoData, newItem
      ]

      return {
        todoData: newTodoData
      }
    })
  };

  toggleProperty(arr, id, propName) {

    const idx = arr.findIndex(
      el => el.id === id
    );

    const newItem = {
      ...arr[idx],
      [propName]: !(arr[idx])[propName]
    };

    return  (propName === 'done') ? [
      ...arr.slice(0, idx),
      ...arr.slice(idx + 1),
      newItem
    ] : [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]
  }

  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <Collapse
          defaultActiveKey={['1']}
          className="c-e"
          expandIconPosition="right"
          ghost>

          <Panel header={
            <AppHeader
              toDo={todoCount}
              done={doneCount}
            />
          } key="1">
            <div className="top-panel d-flex">
              <SearchPanel/>
              <ItemStatusFilter/>
            </div>

            <TodoList
              todos={todoData}
              onDeleted={ this.deleteItem }
              onToggleImportant={ this.toggleImportant }
              onToggleDone={ this.toggleDone }
            />
              <br/>
              <ItemAddForm onAdd={ this.addItem }/>
          </Panel>

        </Collapse>
      </div>
    )
  }
}
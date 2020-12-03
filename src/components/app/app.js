import React from 'react';
import { Collapse } from 'antd';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";

import './app.css'
import 'antd/dist/antd.css';

const { Panel } = Collapse;

const AppH = () => {
  return (
    <AppHeader toDo={1} done={3} />
  )
}

const App = () => {
  const todoData = [
    {label: "Learn Kamasutra",
      important: false,
      id: 1},
    {label: "Build Awesome React App",
      important: true,
      id: 2},
    {label: "Drink Vodka",
      important: false,
      id: 3}
  ]

  return (
    <div className="todo-app">
      <Collapse
        defaultActiveKey={['1']}
        className="c-e"
        expandIconPosition="right"
        ghost>

        <Panel header={<AppH/>} key="1">
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>

          <TodoList todos={todoData} />
        </Panel>

      </Collapse>
    </div>
  )
}

export default App;
import React from "react";
import PropTypes from 'prop-types';
import {TodoListItem} from "../TodoListItem";
import "./index.css";


export function TodoList(props) {
    const { todos, onRemoveTodo, onUpdateTodo, onToggleTodo, loading } = props;
    const todoListItems = todos.map((todo, index) => (
        <TodoListItem
            key={todo.id}
            todo={todo}
            loading={loading}
            onToggleTodo={() => onToggleTodo(index)}
            onRemoveTodo={() => onRemoveTodo(index)}
            onEdit={(values) => {
                    const {body} = values;
                    onUpdateTodo(index, body)
                }
            }
        />
    ));
    return (
       <ol className='todoList'>
            {todoListItems}
       </ol>
    );
};

TodoList.prototype = {
    todos: PropTypes.object.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onToggleTodo: PropTypes.func.isRequired,
}

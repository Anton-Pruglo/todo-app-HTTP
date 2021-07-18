import React, { Component } from 'react';
import { todoAPI } from './api';
import {TodoList} from "./components/TodoList";
import {TodoForm} from "./components/TodoForm";

import "./App.css";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            todos: [],
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        todoAPI.getMany()
            .then((todos) => {
                this.setState({
                    loading: false,
                    todos,
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    error: err,
                });
                this.errorNotification(err);
            });
    }

    createTodo = (body) => {
        this.setState({
            loading: true,
        })

        todoAPI.createOne(body)
            .then((todo) => {
                const { todos } = this.state;
                this.setState({
                    todos: [todo, ...todos],
                    loading: false,
                });
            });
    };


    updateTodo = (index, values) => {
        const { todos } = this.state;
        const todo = todos[index];
        this.setState({
            loading: true,
        })

        todoAPI.updateOne(todo.id, values)
            .then((updatedTodo) => {
                const { todos } = this.state;
                const newTodos = [...todos];
                newTodos[index] = updatedTodo;

                this.setState({
                    todos: newTodos,
                    loading: false,
                });
            })
            .catch(this.errorNotification);
    };

    removeTodo = (index) => {
        const { todos } = this.state;
        const todo = todos[index];
        this.setState({
            loading: true,
        })
        todoAPI.deleteOne(todo?.id)
            .then(() => {
                const { todos } = this.state;
                const newTodos = [...todos];
                newTodos.splice(index, 1);

                this.setState({
                    todos: newTodos,
                    loading: false,
                });
            })
            .catch(this.errorNotification);
    };

    toggleTodo = (index) => {
        const { todos } = this.state;
        const todo = todos[index];

        this.updateTodo(index, {
            isDone: !todo.isDone,
        });
    };

    errorNotification = (err) => {
        alert(err.message ?? 'Something went wrong!');
    };

    render() {
        const { todos, loading } = this.state;
        let loader;
        if(loading) {
            loader = <div className="loader">Loading...</div>
        } else {
           loader = null
        }

        return (
            <article className='todoApp'>
                {loader}
                <TodoForm  onSubmit={(values) => {
                    const { body } = values;
                    this.createTodo(body);
                }}/>
                <TodoList
                    loading={loading}
                    todos={todos}
                    onToggleTodo={this.toggleTodo}
                    onRemoveTodo={this.removeTodo}
                    onUpdateTodo={this.updateTodo}
                />
            </article>
        )
    }
}

export default App;

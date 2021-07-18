import React, {Component} from "react";
import PropTypes from "props-type"

import "./index.css";

export class TodoListItem extends Component {
    constructor(props) {
        super(props);
        const {todo} = this.props;
        this.state = {
            isEdit: false,
            editableText: todo,
       };
    }

    setEdit = (isEdit) =>{
        this.setState({
            isEdit,
        })
    };

    onSubmitEditForm = (e) => {
        const { editableText } = this.state;
        const { onEdit } = this.props;
        onEdit?.(editableText);
        this.setEdit(false);
        e.preventDefault();
        e.stopPropagation();
    }

    render(){
        const { todo: { isDone }, loading, onToggleTodo , onRemoveTodo } = this.props;
        const { isEdit, editableText } = this.state;
        const { editableText: {body}} = this.state;
        const liStyle = {
            textDecoration: (isDone ? 'line-through' : 'initial'),
            color: (isDone ? 'white' : 'initial'),
        }
        if(isEdit){
            return(
                <li className='todoListItem' >
                    <form onSubmit={this.onSubmitEditForm} onBlur={this.onSubmitEditForm} className='editTodoForm'>
                        <input
                            autoFocus
                            name="text"
                            type="text"
                            value={body}
                            onChange={(event) => {
                                const { target: { value } } = event;
                                this.setState({
                                    editableText: {body: value},
                                });
                            }}
                        />
                        <div className='buttonBox'>
                            <button className='btn Save' disabled={loading} type="submit"> </button>
                            <button className='btn Cancel' disabled={loading} onClick={() => this.setEdit(false)}> </button>
                        </div>
                    </form>
                </li>
            )
        }
        return (
            <li className='todoListItem' style={liStyle}>
                <span>{body}</span>
                <div className='buttonBox'>
                    <input type={'checkbox'} disabled={loading} checked={isDone} onChange={onToggleTodo}/>
                    <button className='btn Delete' disabled={loading} onClick={onRemoveTodo}> </button>
                    <button className='btn Edit' disabled={loading} onClick={() => this.setEdit(true)}> </button>
                </div>
            </li>
        )
    }
}
//
// TodoListItem.propTypes = {
//     onEdit: PropTypes.func,
//     onToggleTodo: PropTypes.func,
//     onRemoveTodo: PropTypes.func,
//     todo: PropTypes.object,
// };


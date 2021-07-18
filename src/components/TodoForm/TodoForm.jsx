import React, {Component} from "react";
import PropTypes from 'prop-types';
import "./index.css";

export class TodoForm extends Component {
    constructor(props) {
        super(props);
        const { initialValues } = props;
        this.state = {
            values: initialValues,
        };
    }

    onChangeHandler = (e) => {
        const { target: { value } } = e;
        this.setState({
            values: { body: value },
        });
        e.stopPropagation();
    };

    onSubmitHandler = (e) => {
        const { onSubmit } = this.props;
        onSubmit?.(this.state.values);
        this.reset();
        e.preventDefault();
        e.stopPropagation();
    };

    reset = () => {
        const { initialValues } = this.props;
        this.setState({
            values: initialValues,
        });
    };

    render() {
        const { values: { body } } = this.state;
        return (
            <form className='todoForm' onSubmit={this.onSubmitHandler}>
                <input
                    name={'todo'}
                    type={'text'}
                    value={body}
                    placeholder={'todo text'}
                    onChange={this.onChangeHandler}
                />
                <button type={'submit'}>Add</button>
            </form>
        );
    }
}

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.shape({
        body: PropTypes.string.isRequired,
    }),
};

TodoForm.defaultProps = {
    initialValues: {
        body: '',
    },
};

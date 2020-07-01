import React from 'react';

function Input(props) {
    return (
        <input
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            type={props.type}

        />

    );
}

export default Input;
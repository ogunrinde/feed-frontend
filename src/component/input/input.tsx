import React from 'react';

type IProp = {
    name: string;
    placeholder: string;
    type: string;
    value?: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> ) => void;
}
const Input: React.FC<IProp> = ( prop ) => {
    return (
        <input 
            className='w-full border border-gray-400 p-2 rounded-sm'
            placeholder={ prop.placeholder }
            type={ prop.type }
            defaultValue = { prop.value }
            onChange = {  prop.handleChange }
            name = { prop.name }
        />
    );
   
}

export default Input;
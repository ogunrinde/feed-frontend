import React from 'react';


type IngProps = {
    animal_type: String[];
    placeholder: String;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement> ) => void;    
}

const AnimalType: React.FC<IngProps> = ( prop ) => {
    return(
        <select
            className='w-full border border-gray-400 p-2 rounded-sm'
            onChange={ prop.handleChange }
            value={prop.value}
        >
            <option> {prop.placeholder} </option>
            {
                prop.animal_type.map((animal_type) => <option>{ animal_type } </option> )
            }
        </select>
    );
}

export default AnimalType;
import React from 'react';
import { IngredientProp } from '../../../type/ingredient';


type IngProps = {
    ingredients: IngredientProp[];
    name: string;
    value?: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement> ) => void;    
}

const Select: React.FC<IngProps> = ( prop ) => {
    return(
        <select
            className='w-full border border-gray-400 p-2 rounded-sm'
            onChange={ prop.handleChange }
            name = { prop.name }
            defaultValue = { prop.value }
        >
            <option>Select Ingredient</option>
            {
                prop.ingredients.map((ingredient) => <option>{ ingredient.name } </option> )
            }
        </select>
    );
}

export default Select;
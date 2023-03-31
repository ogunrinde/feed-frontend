import * as React from 'react';
import { createContext, useState } from 'react';
import { IngContextType, IIng, Idata, IngredientProp, IFullIng  } from '../type/ingredient';
import IngDataService from '../service/ingredient';
import { Navigate, useNavigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
  }
export const IngredientContext = React.createContext<IngContextType | null | any >(null);

const IngredientProvider: React.FC<Props> = ({ children }) => {
    const [ ingredientList, setIngredientList ] = useState<IIng[]>([]);
    const [ fetchedIngredients, setFetchIngredients ] = useState<IFullIng[]>([]);
    const [ FormulationResult, setFormulationResult ] = useState<any>([]);
    const [openDialog, setDialogStatus] = React.useState(false);
    const [ predictionModalOpen, setPredictionModal ] = React.useState(false);

    const updateDialogStatus = ( status: boolean) => {
        setDialogStatus( status );
    }

    const updatePredictionModal = ( status: boolean) => {
        setPredictionModal( status );
    }
 
    const handlePredict = () => {
        let prediction = 0;
        if( postData.body_weight != 0  && postData.animal_type == 'Goat' ) {
            prediction = 28.44 + ( 0.067 * FormulationResult['dry_matter'] ) - ( 0.16 * FormulationResult['crude_protein'] ) + ( 0.6 * FormulationResult['ash'] ) - ( 0.21 * FormulationResult['ether_extract'] ) - ( 0.84 * postData.body_weight );
        }

        if( postData.body_weight != 0  && postData.age != 0 && postData.animal_type == 'Sheep' ) {
            prediction = 20.80 + 0.15406 * FormulationResult['dry_matter'] + ( 0.234 * FormulationResult['ash'] ) - ( 0.91 * FormulationResult['ether_extract'] ) - ( 0.071 * FormulationResult['nfe'] ) - ( 1.14 * postData.body_weight ) + ( 1.98 * postData.age );
        }

        updatePostData( Math.round( prediction ), 'prediction');
        updateDialogStatus( false );
        setPredictionModal( true );

    }
    const APIFetchIngredients = () => {
        IngDataService.get()
        .then((response: any) => {
            setFetchIngredients(response.data);
            console.log(response.data.name);
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
    }

    const formulateFeed = () => {
        IngDataService.post( postData )
        .then((response: any) => {
            setFormulationResult(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            let res = {
                message: err.response.data.message,
                data: []
            };
            setFormulationResult( res );
        });
    }
    const [ postData, setpostData ] = useState<Idata>({
        ingredient_number: 0,
        animal_type : "",
        class: "",
        diet: "",
        body_weight: 0,
        age: 0,
        prediction:0,
        quantity: 0,
        ingredient1: null,
        ingredient2: null,
        ingredient3: null,
        ingredient4: null,
        ingredient5: null
    });
    const addIngredient = (ing : IIng) => {
        setIngredientList([...ingredientList, ing ]);
        console.log( ingredientList );
    }
    const updatePostData = (value : string | number | IIng, name: string) => {
        setpostData({...postData, [name] : value });
        console.log( ingredientList );
    }
    const updateIngredient = (id: number) => {
        ingredientList.filter((ing: IIng) => {
          if (ing.id === id) {
            setIngredientList([...ingredientList ]);
          }
        });
    };
    return (
        <IngredientContext.Provider value={ { updatePredictionModal, predictionModalOpen, handlePredict, openDialog, updateDialogStatus, formulateFeed, FormulationResult, fetchedIngredients, APIFetchIngredients, updatePostData, postData, ingredientList, addIngredient, updateIngredient } }>
            {children}
        </IngredientContext.Provider>
    );

}
export default IngredientProvider;



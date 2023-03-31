import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AnimalType from '../Select/animalType';
import Select from '../Select/select';
import { IFormProp } from '../../../type/form';
import IngDataService from '../../../service/ingredient';
import Input from '../../../component/input/input';
import { IngredientProp } from '../../../type/ingredient';
import { IngredientContext } from '../../../context/ingredientContext';
import { IngContextType, IIng } from '../../../type/ingredient';
import { AnyRecord } from 'dns';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from "react-router-dom";
import Pop from './pop';

const steps = [
  {
    label: 'Select Animal Type',
    description: ``,
  },
  {
    label: 'Class of Animal',
    description:'',
  },
  {
    label: 'Type of Diet',
    description:'',
  },
  {
    label: 'Select Number of Ingredient to formulate',
    description: ``,
  },
  {
    label: 'Select Ingredient 1',
    description: ``,
  },
  {
    label: 'Select Ingredient 2',
    description: ``,
  },
  {
    label: 'Select Ingredient 3',
    description: ``,
  },
  {
    label: 'Select Ingredient 4',
    description: ``,
  },
  {
    label: 'Select Ingredient 5',
    description: ``,
  },
  {
    label: 'Target Quantity',
    description: ``,
  },
];
const initIng: IIng = {
    id: 0,
    name: '',
    quantity: 0,
    ash: 0,
    ether_extract: 0,
    nfe: 0,
    dry_matter: 0,
};

const Feed: React.FC = () => {
  const { formulateFeed, updateDialogStatus, ingredientList, addIngredient, updateIngredient, updatePostData,postData } = useContext(IngredientContext) as IngContextType;
  const [activeStep, setActiveStep] = React.useState(0);
  const [ ingNumber, setIngNumber ] = useState<number>(0);
  const [ animalType, setAnimalType ] = useState<string>("");
  const [ animalDiet, setAnimalDiet ] = useState<string>("");
  const [ animalClass, setAnimalClass ] = useState<string>("");
  const [ targetQty, setTargetQty ] = useState<number>(0);
  const [ ingredients, setIngredients ] = useState<Array<IngredientProp>>([]);
  const [ eligibleIngredients, setEligibleIngredients ] = useState<Array<IngredientProp>>([]);
  const [ formulate, updateFormulate ] = useState<IFormProp[]>([]);
  const [ ingredient, setIngredient ] = useState<IIng>(initIng);
  const [ ingName, setIngName ] = useState<string>("");
  const [ ingQuantity, setIngQuantity ] = useState<number>(0);
  const [ error, setError ] = useState<string>("");
  let navigate = useNavigate(); 
  
  const ref = React.useRef(null);

    useEffect(() => {
        fetchIngredients();
    },[]);

    const fetchIngredients = () => {
        IngDataService.get()
        .then((response: any) => {
            setIngredients(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    }
  const handleNext = (index: number) => {
    setError("");
    const next = ValidateInput( index );
    if( !next ) {
        return false;
    }
        
    let step = 1;
    if( index == 5 && ingNumber == 2 )
        step = 4;
    else if( index == 6 && ingNumber == 3 )
        step = 3;
    else if( index == 7 && ingNumber == 4 )
        step = 2;
    setActiveStep((prevActiveStep) => prevActiveStep + step);
    if( index < 9 )
        handlePush( index );
    else
        handleFinish();
  };

  const ValidateInput = ( index: number ) => {
    if( index == 0 && postData.animal_type == "" ) {
        setError("Kindly Select the Animal Type");
        return false;
    } 
    else if( index == 1 && postData.class == "" ) {
        setError("Kindly Select the Animal Class");
        return false;
    }
    else if( index == 2 && postData.diet == "" ) {
        setError("Kindly Select the Animal Diet");
        return false;
    }
    else if( index == 3 && ( postData.ingredient_number < 2 || postData.ingredient_number > 5 ) ) {
        setError("Kindly Input the number of Ingredient, you want to formulate (Minimum of 2 and Maximum of 5)");
        return false;
    }
    else if( index > 3 && index < 9 ) {
        //is exist
        let is_exist = ingredientList.find(o => o.name === ingName );
        if( is_exist ) {
            setError("You have already Select this Ingredient, Kindly select another one");
            return false;
        }
    }
    return true;
  }

  const handlePush = (index : number ) => {
    
    if( index > 3 && index < 9 ) {
        let ing = {
            id: index - 3,
            name: ingName,
            crude_protein: 0,
            ash: 0,
            ether_extract: 0,
            nfe: 0,
            dry_matter: 0,
            quantity: ingQuantity
        };
        addIngredient( ing );
        let obj = eligibleIngredients.find(o => o.name === ingName );
        if( obj ) {
            ing.crude_protein = obj.crude_protein;
            ing.ash = obj.ash;
            ing.ether_extract = obj.ether_extract;
            ing.nfe = obj.nitrogen_free_extract;
            ing.dry_matter = obj.dry_matter;
        }
       
        updatePostData(ing, `ingredient${(index-3)}`);
    }
  }

  const handleFinish = () => {

    formulateFeed();
    navigate('/result');
    

  }

  const handleBack = ( index: number) => {
    let step = 1;
    if( index > 5 )
        step = index - ( Number(ingNumber) + 3 );
    step = step <= 0 ? 1 : step;
    setActiveStep((prevActiveStep) => prevActiveStep - step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAnimalChange = (event: any ) => {
    updatePostData(event.target.value, 'animal_type' );
    setAnimalType(event.target.value);
  }

  const handleAnimalClassChange = (event: any ) => {
    updatePostData(event.target.value, 'class' );
  }

  const handleAnimalDietChange = (event: any ) => {
    setAnimalDiet(event.target.value);
    updatePostData(event.target.value, 'diet' );
    if( event.target.value == 'Concentrate' ) {
        let Concentrate = ingredients.filter(function (item) {
            return [ 'Energy', 'Protein', 'Additive', 'Mineral', 'Fibre'].includes( item.class ); 
        });
        setEligibleIngredients( Concentrate );
    }else {
        setEligibleIngredients( ingredients );
    }
  }

  

  const handleNameChange = (event: any) => {
    setIngName(event.target.value);
    

}

const handleQuantityChange = (event: any) => {
    setIngQuantity(event.target.value);
}

const handleIngNumChange = (e:any) =>  {
    updatePostData(e.target.value, 'ingredient_number' );
    setIngNumber(e.target.value);
}

const handleTargetQtyChange = ( event: any ) => {
    updatePostData(event.target.value, 'quantity' );
    setTargetQty( event.target.value );
}

  return (
    <div className='max-w-md mx-auto p-5'>
         <p className='p-3 text-center text-2xl'>Feed Formulation</p>
         {
            error != "" &&  
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { error }
            </Alert>
         }
        
        <Box sx={{ }}>
        {/* <Pop /> */}
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel
                >
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.description}</Typography>
                {
                    index == 0 &&
                    <div className=''>
                        <div className='w-full'>
                            <AnimalType 
                                animal_type={['Goat', 'Sheep']}
                                value = { postData.animal_type }
                                handleChange = {handleAnimalChange}
                                placeholder = "Select Animal Type"
                            />
                        </div>
                    </div>
                }
                {
                    index == 1 &&
                    <div className=''>
                        <div className='w-full'>
                            <AnimalType 
                                animal_type={['Growing', 'Pregnant', 'Finishing', 'Lactating' ]}
                                value = { postData.class }
                                handleChange = {handleAnimalClassChange}
                                placeholder = "Select Animal Class"
                            />
                        </div>
                    </div>
                }
                {
                    index == 2 &&
                    <div className=''>
                        <div className='w-full'>
                            <AnimalType 
                                animal_type={['Concentrate', 'Total Mixed Ration' ]}
                                value = { postData.diet }
                                handleChange = {handleAnimalDietChange}
                                placeholder = "Select Animal Diet"
                            />
                        </div>
                    </div>
                }
                {
                    index == 3 &&
                    <div className=''>
                        <div className='w-full'>
                            <Input 
                                placeholder='Number of Ingredient to Formulate'
                                handleChange = { (e) => handleIngNumChange (e)}
                                value = { postData.ingredient_number }
                                type="number"
                                name=""
                            />
                        </div>
                    </div>
                }
                {
                    ( index == 4 && ingNumber >= 2 ) &&
                    <div>
                         <div className='w-full'>
                            <Select 
                                ingredients={eligibleIngredients}
                                handleChange = { handleNameChange }
                                value = { postData.ingredient1?.name }
                                name = "name"
                            />
                        </div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Quantity for Ingredient 1'
                                handleChange = { handleQuantityChange }
                                type="number"
                                value = {  postData.ingredient1?.quantity  }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }
                {
                    ( index == 5 && ingNumber >= 2 ) &&
                    <div>
                         <div className='w-full'>
                            <Select 
                                ingredients={eligibleIngredients}
                                handleChange = { handleNameChange }
                                name = "name"
                                value = { postData.ingredient2?.name  }
                            />
                        </div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Quantity for Ingredient 1'
                                handleChange = { handleQuantityChange }
                                type="number"
                                value = { postData.ingredient2?.quantity }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }

                {
                    ( index == 6 && ingNumber >= 3 ) &&
                    <div>
                         <div className='w-full'>
                            <Select 
                                ingredients={eligibleIngredients}
                                handleChange = { handleNameChange }
                                name = "name"
                                value = { postData.ingredient3?.name }
                            />
                        </div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Quantity for Ingredient 1'
                                handleChange = { handleQuantityChange }
                                type="number"
                                value = { postData.ingredient3?.quantity }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }
                {
                    ( index == 7 && ingNumber >= 4 ) &&
                    <div>
                         <div className='w-full'>
                            <Select 
                                ingredients={eligibleIngredients}
                                handleChange = { handleNameChange }
                                name = "name"
                                value = { postData.ingredient4?.name }
                            />
                        </div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Quantity for Ingredient 1'
                                handleChange = { handleQuantityChange }
                                type="number"
                                value = { postData.ingredient4?.quantity }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }
                {
                    ( index == 8 && ingNumber >= 5 ) &&
                    <div>
                         <div className='w-full'>
                            <Select 
                                ingredients={eligibleIngredients}
                                handleChange = { handleNameChange }
                                name = "name"
                                value = { postData.ingredient5?.name }
                            />
                        </div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Quantity for Ingredient 1'
                                handleChange = { handleQuantityChange }
                                type="number"
                                value = { postData.ingredient5?.quantity }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }

{
                    index == 9  &&
                    <div>
                        <div className='w-full mt-2'>
                            <Input 
                                placeholder='Target Quantity'
                                handleChange = { handleTargetQtyChange }
                                type="number"
                                value = { postData.quantity }
                                name = "quantity"
                            />
                        </div>
                    </div>
                   
                }
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        onClick={ () => handleNext(index) }
                        sx={{ mt: 1, mr: 1, background: '#228B22' }}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                        disabled={index === 0}
                        onClick={ () => handleBack(index) }
                        sx={{ mt: 1, mr: 1, color: '#228B22' }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Formulate Again
            </Button>
            </Paper>
        )}
        </Box>
    </div>
  );
}

export default Feed;
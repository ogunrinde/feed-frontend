import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IngredientContext } from '../../../context/ingredientContext';
import { IngContextType } from '../../../type/ingredient';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { DiffieHellman } from 'crypto';
import Button from '@mui/material/Button';
import Pop from './pop';
import { useNavigate } from 'react-router-dom';
import Prediction from './prediction';

type IResult = {
   name: string;
   crude_protein: number;
   quantity: number;
   quantity_required: number;
   message: string;
   meet_requirement: boolean;
}
export default function Result() {
  const { FormulationResult, postData, fetchedIngredients, formulateFeed, updateDialogStatus } = React.useContext(IngredientContext) as IngContextType;
  const [ notMeet, setnotMeet ] = React.useState<string>("");
  const [ min, setMin ] = React.useState<number>(0);

  React.useEffect(() => {
     let minimum = 0;
      if( FormulationResult.length == 0 )
         return;
      for( let i = 0; i <  FormulationResult.data.length; i++ ) {
        let diff = FormulationResult.data[i]['quantity'] - FormulationResult.data[i]['quantity_required'];
        if( diff  < minimum )
          minimum = diff;
      }
     setMin( - 1 * minimum );
     if( minimum != 0 )
      setnotMeet( "Proceed to Formulate for a lower target Quantity" );
  }, [ FormulationResult ])

  const StartFormulation = () => {
    setMin(0);
    setnotMeet( "" );
    postData.quantity = postData.quantity - min;
    formulateFeed();
  }
  return (
    <div className='max-w-full mx-auto p-5'>
         <p className='m-4 p-3 text-center text-2xl'>Feed Formulation Result </p>
         <Pop />
         <Prediction />
         {
            FormulationResult != undefined &&
            FormulationResult.data != undefined &&
            FormulationResult.data.length > 0 &&
            postData.class == "Growing" &&  
              <Button
                  variant="contained"
                  onClick = { () => updateDialogStatus( true ) }
                  sx={{ mt: 1, mr: 1, mb:5, background: '#228B22' }}
              >
                Predict ADG
              </Button>
         }
         {
            notMeet != "" &&  
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { notMeet }
                <Button onClick = { StartFormulation  }>Proceed Now</Button>
            </Alert>
         }
         {
            FormulationResult != undefined &&
            FormulationResult.data != undefined &&
            FormulationResult.data.length == 0 && FormulationResult.message != undefined &&  
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { FormulationResult.message  }
            </Alert>
         }
         {
            FormulationResult != undefined &&
            FormulationResult.data != undefined &&
            FormulationResult.data.length > 0 &&
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Ingredient Name</TableCell>
                    <TableCell>Quantity Supplied</TableCell>
                    <TableCell>Quantity Required</TableCell>
                    <TableCell>Meet Requirement</TableCell>
                    <TableCell>Message</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                      FormulationResult != undefined &&
                      FormulationResult.data != undefined &&
                      FormulationResult.data.length > 0 &&
                      FormulationResult.data.map((row: any) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>{ row.quantity }</TableCell>
                        <TableCell>{row.quantity_required}</TableCell>
                        <TableCell>{row.meet_requirement == true ? 'Yes' :  'No' }</TableCell>
                        <TableCell>{row.message ?? 'None' }</TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Box sx={{ marginTop: 10 }}>
            <p className='m-4 p-3 text-center text-2xl'>Formulation Details </p>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Crude Protein (%)</TableCell>
                    <TableCell>Dry Matter (%)</TableCell>
                    <TableCell>Ash (%)</TableCell>
                    <TableCell>Ether Extract (%)</TableCell>
                    <TableCell>NFE</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {
                    FormulationResult != undefined &&
                    <TableRow>
                        <TableCell component="th" scope="row">
                            { FormulationResult.crude_protein }
                        </TableCell>
                        <TableCell>{  FormulationResult.dry_matter}</TableCell>
                        <TableCell>{ FormulationResult.ash }</TableCell>
                        <TableCell>{ FormulationResult.ether_extract }</TableCell>
                        <TableCell>{ FormulationResult.nfe  }</TableCell>
                    </TableRow>
                  }
                  
                </TableBody>
            </Table>
            </TableContainer>
            </Box>
            </div>
        }
    </div>
  );
}

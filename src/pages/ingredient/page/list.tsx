import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import { IngredientContext } from '../../../context/ingredientContext';
import { IngContextType } from '../../../type/ingredient';
import { useParams } from "react-router-dom";

export default function List() {
const [ ingclass, setIngClass ] = React.useState<string>("Energy");
const { fetchedIngredients, APIFetchIngredients, ingredientList, addIngredient, updateIngredient, updatePostData,postData } = useContext(IngredientContext) as IngContextType;  
React.useEffect(() => {
    APIFetchIngredients();
    const params = new URLSearchParams(window.location.search)
    setIngClass( params.get('class') ?? "Energy" );
},[])
  return (
    <div className='max-w-full mx-auto p-5'>
         <p className='m-4 p-3 text-center text-2xl'>Ingredient List </p>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Ingredient Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Crude Protein (%)</TableCell>
                <TableCell>Dry Matter (%)</TableCell>
                <TableCell>Ether Extract (%)</TableCell>
                <TableCell>Crude Fibre (%)</TableCell>
                <TableCell>Nitrogen Free Extract</TableCell>
                <TableCell>Ash (%)</TableCell>
                <TableCell>Energy (Kcal.kg)</TableCell>
                <TableCell>Calcium (%)</TableCell>
                <TableCell>Phosphorus (%)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
            fetchedIngredients.map((row) => (
                row.class.toLowerCase() == ingclass.toLowerCase() &&
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.class} </TableCell>
                <TableCell>{row.crude_protein}</TableCell>
                <TableCell>{row.dry_matter}</TableCell>
                <TableCell >{row.ether_extract}</TableCell>
                <TableCell>{row.crude_fibre}</TableCell>
                <TableCell>{row.nitrogen_free_extract}</TableCell>
                <TableCell>{row.ash}</TableCell>
                <TableCell>{row.energy}</TableCell>
                <TableCell>{row.calcium}</TableCell>
                <TableCell>{row.phosphorus}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IngredientContext } from '../../../context/ingredientContext';
import { IngContextType } from '../../../type/ingredient';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {

  const { children, onClose, ...other } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >

        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Prediction() {
  const { predictionModalOpen, updatePredictionModal, prediction, FormulationResult, postData } = React.useContext(IngredientContext) as IngContextType;
  const PredictionMessage = () => {
    if( FormulationResult == undefined )
        return;
    let num = ( 0.04 * postData.body_weight * 1000 * FormulationResult.dry_matter ) / 100
    return Math.round( num );
  }
  return (
    <div>
      <BootstrapDialog
        onClose={ () => updatePredictionModal( false ) }
        aria-labelledby="customized-dialog-title"
        open={ predictionModalOpen }
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={ () => updatePredictionModal( false ) }>
          Prediction
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This implies that the animal will gain {postData.prediction} g per day  consuming { PredictionMessage()  } g of formulated diet
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={ () => updatePredictionModal( false ) }>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
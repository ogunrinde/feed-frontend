import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IngredientContext } from '../../../context/ingredientContext';
import { IngContextType } from '../../../type/ingredient';
import Input from '../../../component/input/input';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Pop() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('md');
  const { openDialog, updateDialogStatus, postData, updatePostData, formulateFeed, handlePredict } = React.useContext(IngredientContext) as IngContextType;
  const handleFinish = () => {
    formulateFeed();
    navigate('/result');
  }
  return (
    <div>
      <Dialog
        open={openDialog}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        keepMounted
        onClose={ () => updateDialogStatus( false ) }
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{ `${ postData.animal_type == 'Goat' ? "Input Body Weight" : "Input Body Weight and Age (Month)"}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className=''>
                <div className='w-full'>
                    <Input 
                        placeholder='Body Weight (kg)'
                        handleChange = { (e) => updatePostData(e.target.value, 'body_weight') }
                        type="number"
                        name=""
                    />
                </div>
            </div>
            {
                postData.animal_type == 'Sheep' &&
                <div className='' style={{ marginTop:12 }}>
                    <div className='w-full'>
                        <Input 
                            placeholder='Age'
                            handleChange = { (e) => updatePostData(e.target.value, 'age') }
                            type="number"
                            name=""
                        />
                    </div>
                </div>
            }
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handlePredict }>Predict</Button>
          <Button onClick = { () => updateDialogStatus( false )  }>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

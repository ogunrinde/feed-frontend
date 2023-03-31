import React from 'react';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
//import Ingredient from './pages/ingredient/page/ingredient';
import Result from './pages/ingredient/page/result';
import Feed from './pages/ingredient/page/b';
import IngredientProvider from './context/ingredientContext';
import List from './pages/ingredient/page/list';
import Home from './pages/ingredient/page/home';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Button, createTheme, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#228B22' }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a href = '/'>Smart Nutrition System</a>
                </Typography>
                <a href = '/b'>FEED FORMULATION</a>
                {/* <a href = '/list' style={{ marginLeft: 12}}>Library</a> */}
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ color:'#fff'}}
                >
                  Library
                </Button>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={ handleClose }
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem>
                  <a href = '/list?class=Energy'>Energy</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Agro-industrial by product'>Agro-industrial by product</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Shrub'>Shrub</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Legume'>Legume</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Protein'>Protein</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Additive'>Additive</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Grass'>Grass</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Aquatic plant'>Aquatic plant</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Fibre'>Fibre</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Additive'>Additive</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Mineral'>Mineral</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Multipurpose Tree'>Multipurpose Tree</a>
                </MenuItem>
                <MenuItem>
                  <a href = '/list?class=Roughage'>Roughage</a>
                </MenuItem>
              </Menu>
                {/* <Link to='/b'>Feed Formulation</Link>
                <Link to='/library'>Library</Link>  */}
              </Toolbar>
            </AppBar>
          </Box>
      <IngredientProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<p className='bg-red-700'>Okay</p>}/> */}
            {/* <Route path='/formulate' element={<Ingredient />}/> */}
            <Route path='/' element={<Home />}/>
            <Route path='/result' element={<Result />}/>
            <Route path='/b' element={<Feed />}/>
            <Route path='/list' element={<List />}/>
          </Routes>
        </BrowserRouter>
      </IngredientProvider>
      </ThemeProvider>
        {/* Footer */}
        {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box> */}
      {/* End footer */}
    </div>
  );
}

export default App;

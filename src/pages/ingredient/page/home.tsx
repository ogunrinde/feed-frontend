import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import How from './how';


const cards = [1,2];

export default function Home() {
  const navigate = useNavigate();
  return (
   
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Smart Nutrition System
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                SMANS app formulates diet for sheep and goats. SMANS app predict 
                performance in terms of Average daily gain (ADG) only for West African Dwarf 
                sheep and goats offered formulated diet(s). Explore the robust feed resource 
                library with detailed nutritional contents
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick = { () => navigate('list') } style={{ background: '#228B22' }}>Library</Button>
              <Button variant="outlined" onClick = { () => navigate('b') } style={{ color: '#228B22', border: '1px solid #228B22' }}>Formulate Feed</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://i.pinimg.com/originals/23/d8/62/23d862dacaab03c9694886ad39bf5de1.jpg"
                    alt="random"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              How it Works
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              <How />
            </Typography>
          </Container>
      </main>
  );
}
import { Container, Grid, Typography } from '@mui/material';
import Form from './component/Form';

const App = () => {
    return (
        <Container maxWidth="sm">
            <Grid
                style={{ height: '100vh' }}
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Typography align="center" variant="h1">
                    Accepting payments
                </Typography>
                <Form />
            </Grid>
        </Container>
    );
};

export default App;

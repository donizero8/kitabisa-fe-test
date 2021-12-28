import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Campaign from './CampaignCard/App';
import useStyles from './styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00abef',
            contrastText: '#fff'
        }
    }
});

export default function App(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <img className={classes.icon} src="https://assets.kitabisa.cc/images/logos/logogram__ktbs_white.png" alt="Kitabisa" />
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Pilihan Kitabisa
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Sorted by donation goal
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Sorted by donation days left
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {props.context.data.map((campaign) => {
                                return (
                                    <Grid item key={campaign.id} xs={12} sm={6} md={4}>
                                        <Campaign campaign={campaign} />
                                    </Grid>)
                            })}
                        </Grid>
                    </Container>
                </main>
            </MuiThemeProvider>
        </React.Fragment >
    )
}
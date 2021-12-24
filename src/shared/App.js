import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const BorderLinearProgressGrey = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#615d60',
    },
}))(LinearProgress);

const BorderLinearProgressPink = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#f197df;',
    },
}))(LinearProgress);

const theme = createTheme({
    palette: {
        primary: {
            main: '#00abef'
        }
    }
});

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    spanTextDay: {
        marginRight: theme.spacing(2),
    },
}));

export default function App(props) {
    const classes = useStyles();
    console.log(props)
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
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
                                        <Button variant="outlined" color="primary">
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
                                const percentage = ((campaign.donation_percentage * 100).toFixed() > 100) ? 100 : (campaign.donation_percentage * 100).toFixed(2)
                                return (
                                    <Grid item key={campaign.id} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                component="img"
                                                alt={campaign.titile}
                                                className={classes.cardMedia}
                                                image={campaign.image}
                                                title={campaign.titile}
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {campaign.titile}
                                                </Typography>
                                                <Typography>
                                                    <p>Terkumpul : <span style={{ float: "inline-end" }}>Sisa hari:</span></p>
                                                    <p>{formatter.format(campaign.donation_received)} <span style={{ float: "inline-end" }}>{campaign.days_remaining}</span></p>
                                                    <p>{percentage}%</p>
                                                </Typography>
                                                {percentage < 100 ? <BorderLinearProgressGrey variant="determinate" value={percentage} /> : <BorderLinearProgressPink variant="determinate" value={percentage} />}
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    View
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)
                            })}
                        </Grid>
                    </Container>
                </main>
            </MuiThemeProvider>
        </React.Fragment >
    )
}
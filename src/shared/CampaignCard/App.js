import * as React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from '../styles';
import { BorderLinearProgressGrey, BorderLinearProgressPink } from './TargetBar/App'

export default function Campaign(props) {
    const classes = useStyles();
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    const percentage = ((props.campaign.donation_percentage * 100).toFixed() > 100) ? 100 : (props.campaign.donation_percentage * 100).toFixed(2)
    const round_prercent = Math.round(percentage)
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt={props.campaign.titile}
                className={classes.cardMedia}
                image={props.campaign.image}
                title={props.campaign.titile}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.campaign.titile}
                </Typography>
                <Typography>
                    <p>Terkumpul : <span style={{ float: "inline-end" }}>Sisa hari:</span></p>
                    <p>{formatter.format(props.campaign.donation_received)} <span style={{ float: "inline-end" }}>{props.campaign.days_remaining}</span></p>
                    <p>{percentage}%</p>
                </Typography>
                {percentage < 100 ? <BorderLinearProgressGrey variant="determinate" value={round_prercent} /> : <BorderLinearProgressPink variant="determinate" value={round_prercent} />}
            </CardContent>
            <CardActions>
                <Button href={`/${props.campaign.short_url}`} size="small" color="primary">
                    Lihat
                </Button>
            </CardActions>
        </Card>
    );
}
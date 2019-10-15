import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiBarleyOff } from '@mdi/js';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing()
    }
  },
  iconWrapper: {
    marginLeft: 'auto',
    marginRight: theme.spacing(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icons: {
    fill: theme.palette.grey[500],
    marginLeft: theme.spacing()
  },
  iconCount: {
    color: theme.palette.grey[500],
  }
}));


const DietCard = ({ diet }) => {
  const classes = useStyles();

  return (
    <Card title={diet.title} className={classes.card}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="h2">
          {diet.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {diet.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Manage
        </Button>
        <div className={classes.iconWrapper}>
          <Icon path={mdiBarleyOff} size={1} className={classes.icons} />
          <span className={classes.iconCount}>
            :
            {diet.restricted}
          </span>
          <RestaurantOutlinedIcon color="primary" fontSize="small" className={classes.icons} />
          <span className={classes.iconCount}>
            :
            {diet.allowed}
          </span>
        </div>
      </CardActions>
    </Card>
  );
};

DietCard.propTypes = {
  diet: PropTypes.shape().isRequired
};

export default DietCard;
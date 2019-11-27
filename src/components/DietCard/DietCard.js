import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiBarleyOff } from '@mdi/js';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import EditIcon from '@material-ui/icons/Edit';
import history from 'redux/history';
import CONFIG from 'config';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing()
    }
  },
  actionIconWrapper: {
    marginLeft: 'auto',
    marginRight: theme.spacing(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topIconWrapper: {
    float: 'right'
  },
  icons: {
    fill: theme.palette.grey[500],
    marginLeft: theme.spacing()
  },
  iconCount: {
    color: theme.palette.grey[500],
  }
}));


const DietCard = ({
  diet, onEdit, onManage
}) => {
  const classes = useStyles();

  const editDiet = () => {
    if (onEdit) onEdit(diet);
  };

  const manageDiet = () => {
    if (onManage) onManage(diet);
    history.push(`${CONFIG.UI_URL.MYDIET}/${diet._id}`);
  };

  return (
    <Card title={diet.title} className={classes.card}>
      <CardContent>
        <div className={classes.topIconWrapper}>
          <EditIcon color="primary" fontSize="small" className={classes.icons} onClick={editDiet} />
        </div>
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
        <Button size="small" color="primary" onClick={manageDiet}>
          Manage
        </Button>
        <div className={classes.actionIconWrapper}>
          <Icon path={mdiBarleyOff} size={1} className={classes.icons} />
          <span className={classes.iconCount}>
            :
            {diet.restricted || 0}
          </span>
          <RestaurantOutlinedIcon color="primary" fontSize="small" className={classes.icons} />
          <span className={classes.iconCount}>
            :
            {diet.allowed || 0}
          </span>
        </div>
      </CardActions>
    </Card>
  );
};

DietCard.propTypes = {
  diet: PropTypes.shape().isRequired,
  onEdit: PropTypes.func,
  onManage: PropTypes.func
};

DietCard.defaultProps = {
  onEdit: (diet) => { console.log(`Edit not defined. ${diet}`); },
  onManage: () => { }
};

export default DietCard;
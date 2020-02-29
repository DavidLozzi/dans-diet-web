import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import history from 'redux/history';
import CONFIG from 'config';
import ShareDietDialog from 'components/ShareDietDialog/ShareDietDialog';
import AllowedIcon from 'components/AllowedIcon/AllowedIcon';
import RestrictedIcon from 'components/RestrictedIcon/RestrictedIcon';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing()
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  foodCounts: {
    float: 'right',
    marginLeft: 'auto',
    marginRight: theme.spacing(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topIconWrapper: {
    float: 'right',
    padding: 10,
    marginTop: -10,
    marginRight: -10
  },
  icons: {
    fill: theme.palette.grey[500],
    marginLeft: theme.spacing()
  },
  iconCount: {
    color: theme.palette.grey[500],
  },
  photoCredit: {
    textAlign: 'right',
    marginTop: '-20px',
    marginRight: theme.spacing(),
    fontSize: '10px'
  },
}));


const DietCard = ({
  diet, onEdit, onManage, showManage, showTotals, readOnly, titlePrefix
}) => {
  const classes = useStyles();
  const [openShareDiet, setOpenShareDiet] = useState(false);

  const editDiet = () => {
    if (onEdit) onEdit(diet);
  };

  const manageDiet = () => {
    if (onManage) onManage(diet);
    history.push(`${CONFIG.UI_URL.MYDIET}/${diet._id}`);
  };

  const toggleShareDiet = () => {
    setOpenShareDiet(!openShareDiet);
  };

  return (
    <Card title={diet.title} className={classes.card}>
      {diet.photo && diet.photo.imageUrl &&
        (
          <>
            <CardMedia image={diet.photo.imageUrl} className={classes.media} />
            <div className={classes.photoCredit}>
              <a href={diet.photo.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: diet.photo.color }}>Photo by {diet.photo.user.username}</a>
            </div>
          </>
        )
      }
      <CardContent>
        {!readOnly &&
          (
            <IconButton className={classes.topIconWrapper}>
              <EditIcon fontSize="small" onClick={editDiet} />
            </IconButton>
          )
        }
        <Typography variant="h5" gutterBottom component="h2">
          {titlePrefix} {diet.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {diet.description}
        </Typography>
      </CardContent>
      {!readOnly &&
        (
          <CardActions>
            <ShareDietDialog
              diet={diet}
              onClose={toggleShareDiet}
              toggleShareDiet={toggleShareDiet}
              openShareDiet={openShareDiet}
            />
            <Button size="small" color="primary" onClick={() => setOpenShareDiet(true)}>
              Share{diet.isShared && 'd'}
            </Button>
            {showManage &&
              (
                <Button size="small" color="primary" onClick={manageDiet}>
                  Manage
                </Button>
              )}
            {showTotals &&
              (
                <>
                  <div className={classes.foodCounts}>
                    <RestrictedIcon className={classes.icons} />
                    <span className={classes.iconCount}>
                      {diet.foods ? diet.foods.filter((f) => f.restriction === CONFIG.RESTRICTIONS.RESTRICTED).length : 0} Restricted
                    </span>
                  </div>
                  <div className={classes.foodCounts}>
                    <AllowedIcon className={classes.icons} />
                    <span className={classes.iconCount}>
                      {diet.foods ? diet.foods.filter((f) => f.restriction === CONFIG.RESTRICTIONS.ALLOWED).length : 0} Allowed
                    </span>
                  </div>
                </>
              )}
          </CardActions>
        )
      }
    </Card>
  );
};

DietCard.propTypes = {
  diet: PropTypes.shape().isRequired,
  onEdit: PropTypes.func,
  onManage: PropTypes.func,
  showManage: PropTypes.bool,
  showTotals: PropTypes.bool,
  readOnly: PropTypes.bool,
  titlePrefix: PropTypes.string
};

DietCard.defaultProps = {
  onEdit: (diet) => { console.log(`Edit not defined. ${diet}`); },
  onManage: () => { },
  showManage: true,
  showTotals: true,
  readOnly: false,
  titlePrefix: ''
};

export default DietCard;
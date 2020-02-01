import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import { actions as myDietActions, name as dietName } from 'redux/api/myDiet/myDiet';
import Layout from 'containers/Layout/Layout';
import DietCard from 'components/DietCard/DietCard';
import ManageDietDialog from 'components/ManageDietDialog/ManageDietDialog';

import CONFIG from 'config';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  noDiets: {
    margin: theme.spacing(5)
  }
}));


const Landing = () => {
  const dispatch = useDispatch();
  const myDiets = useSelector((state) => state[dietName].diets);
  const loading = useSelector((state) => state[dietName].loading);
  const [openDietDetails, setOpenDietDetails] = useState(false);
  const [dietDetailsAction, setDietDetailsActions] = useState(CONFIG.OPTIONS.ADD);
  const [selectedDiet, setSelectedDiet] = useState();
  const classes = useStyles();

  useEffect(() => {
    myDietActions.loadDiets()(dispatch);
  }, [dispatch]);

  const toggleDietDetails = () => {
    setOpenDietDetails(!openDietDetails);
    if (openDietDetails) setSelectedDiet();
  };

  const manageDietDetail = (diet) => {
    setSelectedDiet(diet);
    setDietDetailsActions(CONFIG.OPTIONS.EDIT);
    setOpenDietDetails(true);
  };

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Typography
            variant="h3"
            gutterBottom
          >
            My Diets
          </Typography>
        </Grid>
        <Grid item xs={1} style={{ textAlign: 'right', alignContent: 'right' }}>
          <AddCircleOutlineOutlinedIcon fontSize="large" onClick={toggleDietDetails} />
          <ManageDietDialog
            openDietDetails={openDietDetails}
            toggleDietDetails={toggleDietDetails}
            diet={selectedDiet}
            dietDetailsAction={dietDetailsAction}
          />
        </Grid>
        {myDiets.map((diet) => (
          <Grid item key={diet.id} xs={12} sm={6}>
            <DietCard diet={diet} onEdit={manageDietDetail} />
          </Grid>
        ))}
        {
          !loading && myDiets.length === 0 &&
          <Typography variant="h5" className={classes.noDiets}>No diets yet, click the plus above to add your first one!</Typography>
        }
        {
          loading &&
          <div>loading</div>
        }
      </Grid>
    </Layout>
  );
};

export default Landing;
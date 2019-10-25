import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, makeStyles, Typography, Dialog, DialogContent } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import { actions as myDietActions, selectors as myDietSelectors } from 'redux/api/myDiet/myDiet';
import Layout from 'containers/Layout/Layout';
import DietCard from 'components/DietCard/DietCard';
import ManageDietDetail, { actions } from 'components/ManageDietDetail/ManageDietDetail';

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


const Landing = ({ myDiets, myDietActions }) => {
  const classes = useStyles();
  const [openDietDetails, setOpenDietDetails] = useState(false);

  useEffect(() => {
    myDietActions.loadDiets();
  }, []);

  const toggleDietDetails = () => {
    setOpenDietDetails(!openDietDetails);
  };

  return (
    <Layout showTopNav showBottomNav>
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={10}>
          <Typography
            variant="h3"
            gutterBottom
          >
            My Diets
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <AddCircleOutlineOutlinedIcon fontSize="large" onClick={toggleDietDetails} />
          <Dialog open={openDietDetails} onBackdropClick={toggleDietDetails}>
            <DialogContent>
              <ManageDietDetail
                action={actions.add}
                onSave={() => { setOpenDietDetails(false); }}
                onCancel={() => { setOpenDietDetails(false); }}
              />
            </DialogContent>
          </Dialog>
        </Grid>
        {myDiets.map((diet) => (
          <Grid item key={diet.id} xs={12} sm={6}>
            <DietCard diet={diet} />
          </Grid>
        ))}
        {
          myDiets.length === 0 &&
          <Typography variant="h5" className={classes.noDiets}>No diets yet, click the plus above to add your first one!</Typography>
        }
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  myDiets: myDietSelectors.getDiets(state)
});

const mapDispatchToProps = (dispatch) => ({
  myDietActions: bindActionCreators({ ...myDietActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
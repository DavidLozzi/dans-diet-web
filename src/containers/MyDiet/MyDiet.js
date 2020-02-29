import React from 'react';
import PropTypes from 'prop-types';
import MyDiet from 'components/MyDiet/MyDiet';
import Layout from 'containers/Layout/Layout';

const MyDietContainer = ({ match }) => (
  <Layout showTopNav showFooter>
    <MyDiet dietId={match.params.dietId} />
  </Layout>
);

MyDietContainer.propTypes = {
  match: PropTypes.shape().isRequired
};

export default MyDietContainer;
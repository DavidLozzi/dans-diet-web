import React from 'react';
import PropTypes from 'prop-types';
import MyDiet from 'components/MyDiet/MyDiet';
import Layout from 'containers/Layout/Layout';

const ViewDiet = ({ match }) => (
  <Layout showTopNav>
    <MyDiet shareId={match.params.shareId} readOnly />
  </Layout>
);

ViewDiet.propTypes = {
  match: PropTypes.shape().isRequired
};

export default ViewDiet;
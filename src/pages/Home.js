import React from 'react';
import { connect } from 'react-redux';

const Home = ({ }) => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Home);

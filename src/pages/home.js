import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Scream from "../components/Scream";
import Loader from "../components/Loader";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

import Grow from "@material-ui/core/Zoom";

class home extends Component {
  componentDidMount = () => {
    this.props.getScreams();
  };

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <Loader />
    );
    return (
      <Grid container spacing={3}>
        <Grow in={!loading ? true : false}>
          <Grid item sm={8} xs={12}>
            {recentScreamMarkup}
          </Grid>
        </Grow>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);

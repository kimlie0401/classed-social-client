import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Scream from "../components/Scream";
import Loader from "../components/Loader";
import Profile from "../components/Profile";

import Grow from "@material-ui/core/Zoom";

axios.defaults.baseURL =
  "https://us-central1-social-573b5.cloudfunctions.net/api";

class home extends Component {
  state = {
    screams: null
  };

  getScreams = async () => {
    await axios
      .get("/screams")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.getScreams();
  };

  render() {
    let recentScreamMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <Loader />
    );
    return (
      <Grid container spacing={2}>
        <Grow in={this.state.screams ? true : false}>
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

export default home;

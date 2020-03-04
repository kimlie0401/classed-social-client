import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class home extends Component {
  state = {
    screams: null
  };

  getScreams = async () => {
    await axios
      .get("/screams")
      .then(res => {
        console.log(res.data);
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
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <p>Content...</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;

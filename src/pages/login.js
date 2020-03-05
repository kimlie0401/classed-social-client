import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";

import AppIcon from "../images/logo192.png";

// M.ui stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "5px auto 5px auto",
    width: 100,
    height: 100
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20
  }
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm xs={12} />
        <Grid item sm xs={12}>
          <img src={AppIcon} art="logo" className={classes.image} />
          <Typography
            variant="h4"
            color="primary"
            className={classes.pageTitle}
          >
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Grid>
        <Grid item sm xs={12} />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);

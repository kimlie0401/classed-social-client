import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux stuff
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import DialogContentText from "@material-ui/core/DialogContentText";

// Icons
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  ...theme.global
});

class Logout extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleLogout = () => {
    this.props.logoutUser();
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <Tooltip title="Logout" placement="top">
          <IconButton onClick={this.handleOpen}>
            <KeyboardReturn color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle>{"Logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure to logout?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogout} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(null, { logoutUser })(withStyles(styles)(Logout));

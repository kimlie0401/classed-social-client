import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  deleteButton: {
    position: "absolute",
    right: "1%",
    color: "darkred"
  }
};

class DeleteScream extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle>
            <Typography variant="inherit" color="primary">
              Delete Scream
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this scream?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);

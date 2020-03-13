import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";

// Redux stuff
import { connect } from "react-redux";
import { editScream, clearErrors } from "../redux/actions/dataActions";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  ...theme.global,
  submitButton: {
    position: "relative",
    marginBottom: 15
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    right: "2%",
    top: "3%"
  },
  button: {
    position: "absolute",
    right: "9%"
  }
});

class EditScream extends Component {
  state = {
    body: "",
    open: false,
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true, body: this.props.body });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const editedScream = {
      body: this.state.body
    };
    this.props.editScream(editedScream, this.props.screamId);
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Scream"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>
            <Typography variant="inherit" color="primary">
              Edit your scream
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                // placeholder="Scream at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
                autoFocus
                value={this.state.body}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

EditScream.propTypes = {
  editScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { editScream, clearErrors })(
  withStyles(styles)(EditScream)
);

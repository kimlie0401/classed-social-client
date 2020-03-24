import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Comments from "./Comments";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  ...theme.global,
  dialogContent: {
    padding: 20,
    minHeight: 100
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
    // right: "2%",
    // top: "2%"
  },
  header: {
    display: "flex"
  },
  large: {
    width: 60,
    height: 60,
    marginRight: 20
  },
  spinnerDiv: {
    textAlign: "center",
    maringTop: 50,
    margingBottom: 50
  },
  buttons: {
    marginTop: 20
  },
  action: {
    marginTop: 15
  }
});

class ScreamDialog extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle>
            {loading ? (
              <LinearProgress />
            ) : (
              <div className={classes.header}>
                <Avatar
                  alt="Profile"
                  src={userImage}
                  className={classes.large}
                />
                <div>
                  <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                  >
                    @{userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                </div>
                <MyButton
                  tip="Close"
                  onClick={this.handleClose}
                  tipClassName={classes.closeButton}
                >
                  <CloseIcon />
                </MyButton>
              </div>
            )}
          </DialogTitle>
          <DialogContent dividers className={classes.dialogContent}>
            {loading ? (
              <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2} />
              </div>
            ) : (
              <Fragment>
                <Typography variant="body1" style={{ whiteSpace: "pre" }}>
                  {body}
                </Typography>
                <div className={classes.buttons}>
                  <LikeButton screamId={screamId} />
                  <span>{likeCount} Likes</span>
                  <MyButton tip="comments">
                    <ChatIcon color="primary" />
                  </MyButton>
                  <span>{commentCount} comments</span>
                </div>
              </Fragment>
            )}
          </DialogContent>
          <DialogActions className={classes.action}>
            {loading ? <LinearProgress /> : <Comments comments={comments} />}
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import EditScream from "./EditScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// M.ui stuff
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    // display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 150
  },
  content: {
    // padding: 16
    // objectFit: "cover"
  },
  large: {
    width: 50,
    height: 50
  },
  dButton: {}
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    const editButton =
      authenticated && userHandle === handle ? (
        <EditScream screamId={screamId} body={body} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar src={userImage} className={classes.large} />}
          title={
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
          }
          subheader={dayjs(createdAt).fromNow()}
        />
        <Divider variant="middle" />
        <CardContent className={classes.content}>
          <Typography variant="body1" style={{ whiteSpace: "pre" }}>
            {body.length > 100 ? `${body.substring(0, 100)}........` : body}
            {/* {body} */}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
          {editButton}
          {deleteButton}
        </CardActions>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));

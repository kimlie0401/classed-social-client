import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// M.ui stuff
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = {
  card: {
    // display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 150
  },
  content: {
    padding: 16
    // objectFit: "cover"
  },
  large: {
    width: 50,
    height: 50
  }
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
      }
    } = this.props;

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
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);

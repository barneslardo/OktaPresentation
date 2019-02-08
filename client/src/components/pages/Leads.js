import React, { Component, Fragment } from "react";
import { withAuth } from "@okta/okta-react";
import { withRouter, Route, Redirect, Link } from "react-router-dom";
import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Delete as DeleteIcon, Add as AddIcon } from "@material-ui/icons";
import moment from "moment";
import { find, orderBy } from "lodash";
import { compose } from "recompose";

// import PostEditor from "../components/PostEditor";

const styles = theme => ({
  posts: {
    marginTop: 2 * theme.spacing.unit
  },
  fab: {
    position: "absolute",
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit
    }
  }
});

const API = process.env.REACT_APP_API || "http://localhost:3001";

class Leads extends Component {
  state = {
    loading: true,
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${await this.props.auth.getAccessToken()}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    this.setState({ loading: false, posts: await this.fetch("get", "/posts") });
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <h1 class="wacky my-5">Company Leads</h1>
        {this.state.posts.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {orderBy(
                this.state.posts,
                ["updatedAt", "title"],
                ["desc", "asc"]
              ).map(post => (
                <ListItem
                  key={post.id}
                  button
                  component={Link}
                  to={`/posts/${post.id}`}
                >
                  <ListItemText
                    primary={post.title}
                    secondary={
                      post.updatedAt &&
                      `Updated ${moment(post.updatedAt).fromNow()}`
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && (
            <Typography variant="subheading">No posts to display</Typography>
          )
        )}
      </Fragment>
    );
  }
}

export default compose(
  withAuth,
  withRouter,
  withStyles(styles)
)(Leads);

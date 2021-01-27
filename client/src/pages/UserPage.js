import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PostCard from "../components/PostCard";
import moment from "moment";

export default function UserPage(props) {
  const username = props.match.params.username;
  const { loading,  data: { getPostsByUser: posts } = {} } = useQuery(
    FETCH_POSTS_BY_USER,
    {
      variables: {
        username,
      },
    }
  );
  const { data: { getUser: user } = {} } = useQuery(FETCH_USER_INFO, {
    variables: {
      username,
    },
  });

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  Joined:{" "}
                  {user && moment(user[0].createdAt).format("MMM Do YY")}
                </Card.Meta>
                <Card.Description>{user && user[0].email}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={3}>
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          <>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </>
        )}
      </Grid>
    </>
  );
}

const FETCH_POSTS_BY_USER = gql`
  query($username: String!) {
    getPostsByUser(username: $username) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const FETCH_USER_INFO = gql`
  query($username: String!) {
    getUser(username: $username) {
      createdAt
      email
    }
  }
`;

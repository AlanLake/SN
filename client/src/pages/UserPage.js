import React from "react";
import { Card, Grid, Transition, Image } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import PostCard from "../components/PostCard";

export default function UserPage(props) {
  const username = props.match.params.username;
    console.log(props.match.params)
  const {
    loading,
    error,
    data: { getPostsByUser: posts } = {},
  } = useQuery(FETCH_POSTS_BY_USER, {
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
                <Card.Meta></Card.Meta>
                <Card.Description></Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns = {3}>
      {posts &&
        posts.map((post) => (
          
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          
        ))}</Grid>
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

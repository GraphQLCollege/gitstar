import React from "react";
import { Avatar } from "gitstar-components";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_AVATAR = gql`
  query {
    viewer {
      avatarUrl
    }
  }
`;

class UserAvatar extends React.Component {
  render() {
    return (
      <Query query={GET_AVATAR}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          return <Avatar url={data.viewer.avatarUrl} />;
        }}
      </Query>
    );
  }
}

export default UserAvatar;

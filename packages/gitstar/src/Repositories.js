import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Repositories, RepositoriesPlaceholder } from "gitstar-components";

const GET_REPOSITORIES = gql`
  {
    search(type: REPOSITORY, query: "language:Javascript", first: 10) {
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          descriptionHTML
        }
      }
    }
  }
`;

class RepositoriesWrapper extends React.Component {
  render() {
    if (this.props.error) {
      return (
        <div style={{ padding: 20 }}>
          <p>Failed to load repositories</p>
          <a href="/">Refresh Page</a>
        </div>
      );
    }
    return this.props.loading ? (
      <RepositoriesPlaceholder />
    ) : (
      <Repositories repositories={this.props.repositories} />
    );
  }
}

export default graphql(GET_REPOSITORIES, {
  props: ({ data: { error, loading, search } }) => {
    return {
      repositories: search ? search.nodes : [],
      loading,
      error
    };
  }
})(RepositoriesWrapper);

import React, { Fragment } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import {
  Repositories,
  RepositoriesPlaceholder,
  LoadMoreButton
} from "gitstar-components";

const GET_REPOSITORIES = gql`
  query($after: String) {
    search(
      type: REPOSITORY
      query: "language:Javascript"
      first: 10
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          nameWithOwner
          url
          descriptionHTML
          viewerHasStarred
        }
      }
    }
  }
`;

const ADD_STAR = gql`
  mutation($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        id
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        id
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
    // Show placeholders on first render
    if (this.props.loading && !this.props.repositories) {
      return <RepositoriesPlaceholder />;
    }
    // Show both repositories and placeholder when user clicks show more
    if (this.props.loading) {
      return (
        <Fragment>
          <Repositories
            repositories={this.props.repositories}
            addStar={this.props.addStar}
            removeStar={this.props.removeStar}
          />
          <RepositoriesPlaceholder />
          <LoadMoreButton loadMore={this.props.loadMore} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Repositories
          repositories={this.props.repositories}
          addStar={this.props.addStar}
          removeStar={this.props.removeStar}
        />
        <LoadMoreButton loadMore={this.props.loadMore} />
      </Fragment>
    );
  }
}

export default compose(
  graphql(GET_REPOSITORIES, {
    props: ({ data: { error, loading, search, fetchMore } }) => {
      return {
        repositories: search ? search.nodes : null,
        loading,
        error,
        loadMore: () =>
          fetchMore({
            variables: { after: search.pageInfo.endCursor },
            updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
              const previousSearch = previousResult.search || {};
              const currentSearch = fetchMoreResult.search || {};
              const previousNodes = previousSearch.nodes || [];
              const currentNodes = currentSearch.nodes || [];
              // Specify how to merge new results with previous results
              return {
                ...previousResult,
                search: {
                  ...previousSearch,
                  nodes: [...previousNodes, ...currentNodes],
                  pageInfo: currentSearch.pageInfo
                }
              };
            }
          })
      };
    },
    options: {
      notifyOnNetworkStatusChange: true // Update loading prop after loadMore is called
    }
  }),
  graphql(ADD_STAR, {
    props: ({ mutate }) => ({
      addStar: starrableId =>
        mutate({
          variables: { starrableId },
          update: proxy => {
            proxy.writeFragment({
              id: `Repository:${starrableId}`,
              fragment: gql`
                fragment repository on Repository {
                  viewerHasStarred
                }
              `,
              data: { viewerHasStarred: true, __typename: "Repository" }
            });
          }
        })
    })
  }),
  graphql(REMOVE_STAR, {
    props: ({ mutate }) => ({
      removeStar: starrableId =>
        mutate({
          variables: { starrableId },
          optimisticResponse: {
            __typename: "Mutation",
            removeStar: {
              starrable: {
                id: starrableId,
                __typename: "Repository"
              }
            }
          },
          update: proxy => {
            proxy.writeFragment({
              id: `Repository:${starrableId}`,
              fragment: gql`
                fragment repository on Repository {
                  viewerHasStarred
                }
              `,
              data: { viewerHasStarred: false, __typename: "Repository" }
            });
          }
        })
    })
  })
)(RepositoriesWrapper);

import React from "react";

export const LoadMoreButton = ({ loadMore = () => {} }) => (
  <button
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 24,
      marginBottom: 24,
      display: "block"
    }}
    className="btn btn-outline"
    onClick={loadMore}
  >
    Load more
  </button>
);

import React from "react";

export const LoadMoreButton = ({ loadMore = () => {} }) => (
  <button
    style={{
      margin: "0 auto",
      display: "block"
    }}
    className="btn btn-outline"
    onClick={loadMore}
  >
    Load more
  </button>
);

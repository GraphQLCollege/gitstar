import React from "react";

import Star from "./Star";

import "./Repositories.css";

export const RepositoriesPlaceholder = () => (
  <ul
    style={{
      maxWidth: 900,
      margin: "0 auto",
      listStyle: "none",
      paddingLeft: 18,
      paddingRight: 18
    }}
  >
    {Array(10)
      .fill("")
      .map((line, index) => (
        <li key={index} style={{ paddingTop: 24, paddingBottom: 24 }}>
          <div className="name-placeholder" />
          <div className="text-placeholder" />
          <div className="text-placeholder" />
        </li>
      ))}
  </ul>
);

export const Repositories = ({ repositories = [], addStar, removeStar }) => (
  <ul
    style={{
      maxWidth: 900,
      margin: "0 auto",
      listStyle: "none",
      paddingLeft: 18,
      paddingRight: 18
    }}
  >
    {repositories.map(
      ({ nameWithOwner, id, descriptionHTML, url, viewerHasStarred }) => (
        <li key={id} className="repository">
          <div className="description">
            <h3>
              <a href={url}>{nameWithOwner}</a>
            </h3>
            <p
              style={{ width: "75%" }}
              dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
          </div>
          <Star
            starred={viewerHasStarred}
            addStar={() => addStar(id)}
            removeStar={() => removeStar(id)}
          />
        </li>
      )
    )}
  </ul>
);

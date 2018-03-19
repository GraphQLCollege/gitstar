import React from "react";

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

export const Repositories = ({ repositories }) => (
  <ul
    style={{
      maxWidth: 900,
      margin: "0 auto",
      listStyle: "none",
      paddingLeft: 18,
      paddingRight: 18
    }}
  >
    {repositories.map(({ nameWithOwner, id, descriptionHTML, url }) => (
      <li key={id} style={{ paddingTop: 24, paddingBottom: 24 }}>
        <h3>
          <a href={url}>{nameWithOwner}</a>
        </h3>
        <p
          style={{ width: "75%" }}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
      </li>
    ))}
  </ul>
);
import React from "react";

class Logo extends React.Component {
  render() {
    return (
      <svg
        version="1.1"
        width="28"
        height="32"
        viewBox="0 0 14 16"
        className="octicon octicon-star"
        aria-hidden="true"
        name="star"
      >
        <path
          fillRule="evenodd"
          d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"
        />
      </svg>
    );
  }
}

export default Logo;

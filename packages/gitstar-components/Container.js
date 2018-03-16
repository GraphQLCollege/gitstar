import React from "react";

import "primer/build/build.css";
import "./App.css";

class Container extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Container;

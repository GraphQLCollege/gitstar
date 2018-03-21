import React from "react";

import Lottie from "./Lottie";
import FinalStar from "./FinalStar";
import * as animationData from "./star.json";

const defaultOptions = {
  loop: false,
  autoplay: false,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class Star extends React.Component {
  state = { isStopped: true };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer"
        }}
        onClick={() => {
          if (this.props.starred) {
            this.props.removeStar();
            this.setState(({ isStopped }) => ({ isStopped: true }));
          } else {
            this.setState(({ isStopped }) => ({ isStopped: false }));
            this.props.addStar();
          }
        }}
      >
        <FinalStar
          height={200}
          width={200}
          style={{ display: this.props.starred ? "block" : "none" }}
        />
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
          style={{ display: this.props.starred ? "none" : "block" }}
          isStopped={this.state.isStopped}
        />
      </div>
    );
  }
}

export default Star;

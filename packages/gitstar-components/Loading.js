import React from "react";

import Lottie from "./Lottie";
import STATUS from "./status";
import * as animationData from "./loading.json";

import "./Loading.css";

const defaultOptions = {
  loop: true,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        {this.props.status !== STATUS.AUTHENTICATED && (
          <div style={{ position: "absolute" }}>
            <Lottie
              options={{ ...defaultOptions, loop: false }}
              isStopped={this.props.status !== STATUS.FINISHED_LOADING}
              segments={[41, 72]}
              eventListeners={[
                {
                  eventName: "complete",
                  callback: this.props.callback
                }
              ]}
            />
          </div>
        )}
        <div style={{ position: "absolute" }}>
          <Lottie
            options={defaultOptions}
            isStopped={this.props.status !== STATUS.LOADING}
            segments={[0, 41]}
          />
        </div>
      </div>
    );
  }
}

export default Loading;

import React from "react";

class Avatar extends React.Component {
  render() {
    return (
      <img
        className="avatar avatar-small"
        src="https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
        width={32}
        height={32}
        alt="logo"
        {...this.props}
      />
    );
  }
}

export default Avatar;

import React from "react";

class Avatar extends React.Component {
  static defaultProps = {
    url:
      "https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
  };
  render() {
    const { url, ...props } = this.props;
    return (
      <img
        className="avatar avatar-small"
        src={url}
        width={32}
        height={32}
        alt="logo"
        {...props}
      />
    );
  }
}

export default Avatar;

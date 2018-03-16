import React, { Component } from "react";
import fetch from "unfetch";
import {
  STATUS,
  Loading,
  Avatar,
  Logo,
  Logotype,
  Container,
  Header
} from "gitstar-components";

const CLIENT_ID = "cdc18a1912950f105f70";
const REDIRECT_URI = "http://localhost:3000/";

class App extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null
  };
  componentDidMount() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING
          });
        });
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Logo />
            <Logotype />
          </div>
          <Avatar
            style={{
              transform: `scale(${
                this.state.status === STATUS.AUTHENTICATED ? "1" : "0"
              })`
            }}
          />
          <a
            style={{
              display: this.state.status === STATUS.INITIAL ? "inline" : "none"
            }}
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login
          </a>
        </Header>
        <Loading
          status={this.state.status}
          callback={() => {
            if (this.props.status !== STATUS.AUTHENTICATED) {
              this.setState({
                status: STATUS.AUTHENTICATED
              });
            }
          }}
        />
      </Container>
    );
  }
}

export default App;

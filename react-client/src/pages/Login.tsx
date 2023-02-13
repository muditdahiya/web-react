import React from "react";


class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e:any) => {
    const { name, value } = e.target;
    this.setState({
      name: value,
    });
  };
  handleSubmit = (e:any) => {
    e.preventDefault();
  };
  render() {
    return (
      <div  className="login-container">
        <h1 className="header">WELCOME</h1>
        <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name-="email"
            placeholder="email"
            required
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={this.handleChange}
          /><br></br>
          <button onSubmit={this.handleSubmit}>Log In</button>
        </form>
    </div>
      </div>
    );
  }
}

export default Login;

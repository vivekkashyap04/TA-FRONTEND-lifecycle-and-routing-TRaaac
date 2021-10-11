import React from 'react';
import Loader from './loader';
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: 'user',
    };
  }
  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((user) =>
        this.setState({
          data: user.results,
        })
      );
  }

  getRandomeUser = () => {
    console.log('random');
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data.results,
          value: 'user',
        });
      });
  };
  handleClick = (user, e) => {
    console.log(user, e, 'mouse');
    switch (e.target.id) {
      case 'phone':
        this.setState({
          value: `my phone is ${user}`,
        });
        break;
      case 'user':
        this.setState({
          value: `my name is ${user}`,
        });
        break;
      default:
        break;
    }
  };

  render() {
    console.log(this.state.data);
    if (!this.state.data) {
      return <Loader />;
    }
    return (
      <>
        {this.state.data.map((user) => {
          return (
            <div className="box">
              <center>
                <img src={user.picture.large} alt={user.picture.medium} className="img"/>
                <h2>
                  {this.state.value === 'user'
                    ? `my name is ${user.name.first}`
                    : this.state.value}
                </h2>

                <div className="icon">
                  <i
                    className="fas fa-user"
                    id="user"
                    onMouseOver={(e) => this.handleClick(user.name.first, e)}
                  ></i>
                  <i
                    className="fas fa-phone"
                    id="phone"
                    onMouseOver={(e) => this.handleClick(user.phone, e)}
                  ></i>
                </div>
                <button onClick={this.getRandomeUser}>Random User</button>
              </center>
            </div>
          );
        })}
      </>
    );
  }
}

export default User;

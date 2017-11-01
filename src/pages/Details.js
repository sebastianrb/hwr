import React from 'react';
import Chance from 'chance';
import ajax from 'superagent';

export default class Details extends React.Component {

  constructor(props) {
    //send props up to parent object (Component)
    super(props);


    this.state = {
      country: chance.country({full: true}),
      firstName: chance.first(),
      users: [],
      commits: [],
      forks: [],
      pulls: [],
      activeView: "commits"
    };

    this.onCountryButtonClick = this.onCountryButtonClick.bind(this);
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {
    let usersEndPoint = "https://reqres.in/api/users?page=2";
    ajax.get(usersEndPoint)
      .end((error, response) => {
        if (!error && response) {
            console.log(response);
            this.setState({ users: response.body.data });
        } else {
            console.log('There was an error fetching from GitHub', error);
        }
      });

      this.fetchFeed('commits');
      this.fetchFeed('forks');
      this.fetchFeed('pulls');
  }

  fetchFeed(type) {
    ajax.get(`https://api.github.com/repos/facebook/react/${type}`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ [type]: response.body });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
  }

  onCountryButtonClick() {
    this.setState({
      country: chance.country({full: true}),
      firstName: chance.first()
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state !== nextState) {
      return true;
    } else {
      return false;
    }
  }

  setView(type) {
    this.setState({
      activeView: type
    });
  }

  render() {

    let list;

    if(this.state.activeView === "commits") {
      list = this.state.commits.map((commit) => {
        const author = commit.author ? commit.author.login : "Anonymous";
        return (
          <li key={commit.sha}>
              <strong>{author}</strong>:
              <a href={commit.html_url}> {commit.commit.message}</a>.
          </li>
        );
      });
    } else if(this.state.activeView === "forks") {
      list = this.state.forks.map((fork) => {
        const owner = fork.owner ? fork.owner.login : "Anonymous";
        return (
          <li key={fork.id}>
              <strong>{owner}</strong>:
              <a href={fork.html_url}> {fork.description}</a>.
          </li>
        );
      });
    } else {
      list = this.state.pulls.map((pull) => {
        const user = pull.user ? pull.user.login : "Anonymous";
        return (
          <li key={pull.id}>
              <strong>{user}</strong>:
              <a href={pull.html_url}> {pull.body}</a>.
          </li>
        );
      });
    }

     return (
     		<div>
           <h3>This is React rendering HTML! Merpalerp</h3>
{/*     		<p>Message: {this.props.message}</p>
           <p>Hello, {this.state.firstName}!</p>
           <p>Are you from {this.state.country}?</p>
           <button onClick={this.onCountryButtonClick}>Change Country</button>*/}
           <div className="view-buttons">
             <button className="view-button button--commits" onClick={this.setView.bind(this, "commits")}>Commits</button>
             <button className="view-button button--forks" onClick={this.setView.bind(this, "forks")}>Forks</button>
             <button className="view-button button--pulls" onClick={this.setView.bind(this, "pulls")}>Pulls</button>
           </div>

           <ul>
              {list}
           </ul>
{/*           {this.state.users.map((user, index) => (
              <div className="user" key={user.id}>
                <p className="user__name">{user.first_name} {user.last_name}</p>
                <div className="user__image-container">
                  <img src={user.avatar} alt="avatar"/>
                </div>
              </div>
            ))}
            {this.state.commits.map((commit) => {
              const author = commit.author ? commit.author : "Anonymous";
              return (
                <p key={commit.sha}>
                    <strong>{author}</strong>:
                    <a href={commit.html_url}>{commit.commit.message}</a>.
                </p>
              );
            })}*/}
     		</div>
     	);
  }
}

import React from "react";
import ajax from "superagent";
import { Link, NavLink } from "react-router-dom";

export default class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}

	componentWillMount() {
		let baseURL = "https://api.github.com/users";
		ajax.get(`${baseURL}/${this.props.match.params.name}/events`).end((error, response) => {
			if (!error && response) {
				this.setState({ events: response.body });
			} else {
				console.log(`Error fetching events: `, error);
			}
		});
	}

	render() {
		let list = this.state.events.map(event => {
			return (
				<li key={event.id}>
					<p>
						Event type: {event.type}
					</p>
					<p>
						Repo affected: {event.repo.name}
					</p>
					<p>
						Date: {event.created_at}
					</p>
				</li>
			);
		});

		return (
			<div>
				<p>
					You are here:{" "}
					<NavLink exact to="/" activeClassName="active">
						Home
					</NavLink>
					> {this.props.match.params.name}
				</p>
				<h3>User Page</h3>
				<h4>User Events:</h4>
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}

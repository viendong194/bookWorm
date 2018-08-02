import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { getImages } from '../../image_actions';
import Gallery from '../gallery/Gallery';
class HomePage extends Component {
	// componentDidMount() {
	// 	this.props.getImages();
	// }
	render() {
		return (
			<div>
				<h1>HomePage</h1>
				{this.props.isAuthenticated ? (
					<button onClick={this.props.logout}>Logout</button>
				) : (
					<div>
						<Link to="/login">Login</Link> or{' '}
						<Link to="/signup">Sign Up</Link>
					</div>
				)}
				{this.props.images ? (
					<Gallery images={this.props.images} />
				) : (
					<p>No loaded image</p>
				)}
			</div>
		);
	}
}

function mapPropsToState(state) {
	return {
		isAuthenticated: !!state.user.token,
		images: state.image
	};
}
export default connect(
	mapPropsToState,
	{ logout, getImages }
)(HomePage);

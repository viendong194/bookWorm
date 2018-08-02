import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../message/ConfirmEmailMessage';
// import { allBooksSelector } from '../../reducers/book';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import AddImageForm from '../form/NewImageForm';
import PersonalGallery from '../gallery/PersonalGallery';
class DashBoardPage extends Component {
	render() {
		return (
			<div>
				{!this.props.isConfirmed && <ConfirmEmailMessage />}
				<Button as={Link} to='/imageform'>ADD YOUR NEW IMAGE</Button>
				<PersonalGallery/>
			</div>
		);
	}
}
function mapPropsToState(state) {
	return {
		isCornfirmed: state.user.isCornfirmed
		// books: allBooksSelector(state)
	};
}
export default connect(mapPropsToState)(DashBoardPage);

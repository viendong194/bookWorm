import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditImageForm from '../form/EditImageForm';
import NewImageForm from '../form/NewImageForm';
class ImagePage extends Component {
	render() {
    let id = this.props.match.params.id;
    const temp = this.props.images.filter((el) => el._id === id)[0];
		return (
			<div>
				{this.props.match.params.id ? (
					<EditImageForm image={temp} />
				) : (
					<NewImageForm />
				)}
			</div>
		);
	}
}
function mapPropsToState(state) {
	return {
		images: state.image
	};
}
export default connect(mapPropsToState)(ImagePage);

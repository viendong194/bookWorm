import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditImageForm from '../form/EditImageForm';
import NewImageForm from '../form/NewImageForm';
class ImagePage extends Component {
	state = {
		image: null
	};
	componentDidMount() {
		if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      setTimeout(()=>console.log(this.props.images),200);
			let temp = null;
			temp = this.props.images.filter((el) => el._id === id)[0];
      console.log(this.props.images);
      console.log(temp);
			this.setState({ image: temp },()=>console.log(this.state.image));
		}
	}
	render() {
		return (
			<div>
				{this.props.match.params.id ? (
					<EditImageForm image={this.state.image} />
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

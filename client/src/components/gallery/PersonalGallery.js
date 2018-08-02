import React, { Component } from 'react';
import { Card, Image ,Grid } from 'semantic-ui-react';
import PersonalImage from './PersonalImage';
import { connect } from 'react-redux';
import styled from 'styled-components';
class PersonalGallery extends Component {
	render() {
		return (
			<Div>
				{this.props.images.map((image, i) => {
					if (image.author === this.props.email)
						return <PersonalImage image={image} key={image._id}/>;
				})}
			</Div>
		);
	}
}
function mapPropsToState(state) {
	return {
		email: state.user.email,
		images: state.image
	};
}
export default connect(mapPropsToState)(PersonalGallery);
const Div = styled.div`
  display:flex;
	justify-content:space-around;
	flex-wrap:wrap;
  align-items: top;
`
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteImage } from '../../image_actions';
import { Card, Image, Button } from 'semantic-ui-react';

class PersonalImage extends React.Component {
	render() {
		return (
			<Card>
				<Image src={this.props.image.url} />
				<Card.Content>
					<Card.Header>{this.props.image.title}</Card.Header>
					<Card.Description>
						{this.props.image.description}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className="ui two buttons">
						<Button
							basic
							color="green"
							as={Link}
							to={`/imageform/${this.props.image._id}`}>
							Edit
						</Button>
						<Button basic color="red" onClick={()=>this.props.deleteImage(this.props.image._id)}>
							Delete
						</Button>
					</div>
				</Card.Content>
			</Card>
		);
	}
}
export default connect(
	null,
	{ deleteImage }
)(PersonalImage);

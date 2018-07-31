import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
class Gallery extends Component {
	render() {
		return (
			<div>
				{this.props.images.map((image, i) => (
					<Card key={i}>
						<Image src={image.url} />
						<Card.Content>
							<Card.Header>{image.title}</Card.Header>
							<Card.Description>
								{image.description}
							</Card.Description>
						</Card.Content>
					</Card>
				))}
			</div>
		);
	}
}

export default Gallery;

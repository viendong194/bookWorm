import React, { Component } from 'react';
import { Card, Image, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
class Gallery extends Component {
	render() {
		return (
			<Div>
				{this.props.images.map((image, i) => (
					<Grid.Column verticalAlign="top" key={i}>
						<Card>
							<Image src={image.url} />
							<Card.Content>
								<Card.Header>{image.title}</Card.Header>
								<Card.Meta>
									<span>Uploaded by:{image.author}</span>
								</Card.Meta>
								<Card.Description>
									{image.description}
								</Card.Description>
							</Card.Content>
						</Card>
					</Grid.Column>
				))}
			</Div>
		);
	}
}

export default Gallery;
const Div = styled.div`
  display:flex;
	justify-content:space-around;
	flex-wrap:wrap;
	align-items: top;
`
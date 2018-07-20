import React, { Component } from 'react';
import { Segment, Grid, Form, Button, Image } from 'semantic-ui-react';
export default class BookForm extends Component {
	state = {
		data: {
			goodreadsId: this.props.book.goodreadsId,
			title: this.props.book.title,
			author: this.props.book.author,
			pages: this.props.book.pages,
			cover: this.props.book.covers[0]
		},
		covers: this.props.book.cover,
		loading: false,
		errors: {}
	};
	componentWillReceiveProps(nextprops) {
		if (this.props.data !== nextprops)
			this.setState({
				data: {
					goodreadsId: nextprops.book.goodreadsId,
					title: nextprops.book.title,
					author: nextprops.book.author,
					pages: nextprops.book.pages,
					cover: nextprops.book.covers[0]
				}
			});
	}
	/**
	 * onChange
	 */
	onChange = (e) =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	/**
	 * onChangeNumber
	 */
	onChangeNumber = (e) =>
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: parseInt(e.target.value, 10)
			}
		});
	/**
	 * on Submit
	 */
	onSubmit = () => {
		let errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data).catch((err) => {
				err.json().then((value) =>
					this.setState({ errors: value.errors, loading: false })
				);
			});
		}
	};
	/**
	 * validation
	 */
	validate = (data) => {
		let errors = {};
		if (!data.title) errors.title = "Can't be empty";
		if (!data.author) errors.author = "Can't be empty";
		if (!data.pages) errors.pages = "Can't be empty";
		return errors;
	};
	render() {
		const { errors, data } = this.state;
		return (
			<Segment>
				<Form>
					<Grid column={2}>
						<Grid.Row>
							<Grid.Column>
								<Form.Field error={!!errors.title}>
									<label htmlFor="title">Book Title</label>
									<input
										type="text"
										id="title"
										name="title"
										placeholder={
											!!errors.title === true
												? errors.title
												: 'War&Peace'
										}
										value={data.title}
										onChange={this.onChange}
									/>
								</Form.Field>
								<Form.Field error={!!errors.author}>
									<label htmlFor="author">Book author</label>
									<input
										type="text"
										id="author"
										name="author"
										placeholder={
											!!errors.author === true
												? errors.author
												: 'Someone'
										}
										value={data.author}
										onChange={this.onChange}
									/>
								</Form.Field>
								<Form.Field error={!!errors.pages}>
									<label htmlFor="pages">Book pages</label>
									<input
										type="number"
										id="pages"
										name="pages"
										placeholder={
											!!errors.pages === true
												? errors.pages
												: 'Someone'
										}
										value={data.pages}
										onChange={this.onChangeNumber}
									/>
								</Form.Field>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Button primary>Save</Button>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		);
	}
}

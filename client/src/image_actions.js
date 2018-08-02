export const SET_IMAGES = 'SET_IMAGES';
export const ADD_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';

export function addImage(IMAGE) {
	return {
		type: ADD_IMAGE,
		data: IMAGE
	};
}
export function setImages(images) {
	return {
		type: SET_IMAGES,
		data: images
	};
}
export function imageDeleted(image) {
	return {
		type: DELETE_IMAGE,
		data: image
	};
}
export function imageUpdated(image) {
	return {
		type: UPDATE_IMAGE,
		data: image
	};
}
export function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error();
		error.response = response;
		throw error;
	}
}
export function postImage(data) {
	return (dispatch) => {
		const dataUpload = new FormData();
		dataUpload.append('image', data.src);
		dataUpload.append('title', data.title);
		dataUpload.append('description', data.description);
		dataUpload.append('author', data.author);
		return fetch('http://localhost:8080/api/images', {
			method: 'post',
			body: dataUpload
		})
			.then(handleResponse)
			.then((data) => {
				dispatch(addImage(data));
			});
	};
}

/**
 * get all images
 *
 * @export
 * @returns data images
 */
export function getImages() {
	return (dispatch) => {
		return fetch('http://localhost:8080/api/images')
			.then((res) => res.json())
			.then((data) => dispatch(setImages(data.image)));
	};
}
/**
 * delete Image
 * @param {*} id
 */
export function deleteImage(id) {
	return (dispatch) => {
		return fetch(`http://localhost:8080/api/images/${id}`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(handleResponse)
			.then((data) => dispatch(imageDeleted(id)));
	};
}
/**
 * update image
 * @param {*} data
 */
export function updateImage(data) {
	return (dispatch) => {
		return fetch(`http://localhost:8080/api/images/${data.id}`, {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(handleResponse)
			.then((data) => dispatch(updateImage(data.image)));
	};
}

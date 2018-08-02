import { SET_IMAGES, ADD_IMAGE , UPDATE_IMAGE , DELETE_IMAGE } from '../image_actions';
export default (state = [], action = {}) => {
	switch (action.type) {
		case ADD_IMAGE:
			return [...state, action.data];
		case SET_IMAGES:
			return action.data;
		case UPDATE_IMAGE:
			return state.map(item=>{
					if(item._id===action.data._id) return action.data;
					return item;
			})
		case DELETE_IMAGE:
			return state.filter(index=>index._id!==action.data)
		default:
			return state;
	}
};

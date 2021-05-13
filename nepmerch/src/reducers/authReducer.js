import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	ADD_CART_TO_USER,
	CART_LOADING,
	CART_LOADED,
	REMOVE_FROM_CART,
	PAYMENT_SUCCESS,
	LOAD_USER,
	LOAD_STORE,
	STORE_CREATED,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: false,
	storeName: null,
	user: {
		cart: [],
		history: [],
		_id: null,
		name: null,
		email: null,
		password: null,
	},
	cartDetail: [
		{ title: "", description: "", price: 0, image: [], quantity: 0 },
	],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};

		case LOAD_STORE:
			return {
				...state,
				storeName: action.payload,
			};

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};

		case STORE_CREATED:
	

			return {
				...state,
				...action.payload,
				storeName: action.payload.store.name,
			
			};		
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:

			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				//payload must contain token and user object
				isAuthenticated: true,
				isLoading: false,
			};

		case AUTH_ERROR:
			return {
				...state,

				isAuthenticated: false,
				isLoading: false,
				user: { ...state.user, cart: [] },
				cartDetail: null,
			};
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: { ...state.user, cart: [] },
				cartDetail: null,
			};
		case ADD_CART_TO_USER:
			return {
				...state,
				user: action.payload,
			};

		case CART_LOADING:
			return {
				...state,
				user: { ...state.user, cart: action.payload.cart },
			};
		case CART_LOADED:
			return {
				...state,
				cartDetail: action.payload,
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				user: {
					...state.user,
					cart: action.payload.data.cart,
				},
				cartDetail: action.payload.data.cartDetail,
			};
		case PAYMENT_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				cartDetail: action.payload.cartDetail,
			};

		default:
			return state;
	}
}

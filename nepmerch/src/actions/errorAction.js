import { GET_ERRORS, CLEAR_ERRORS } from "./types";

//Returns errors

export const returnErrors = (msg, type, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { msg, type, status, id },
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};

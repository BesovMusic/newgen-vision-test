import { createStore } from 'vuex';
import axios from 'axios';

export const GET_TEXT = 'getAction';

export default createStore({
	state: {
		text: '',
		currentRowIndex: 0,
		currentSymbolIndex: 0,
		isWrong: false,
		errorCounter: 0,
		currentTime: 1,
		enteredСharacters: 0,
	},
	mutations: {
		SET_TEXT_TO_STATE: (state, text) => {
			state.text = text.data;
		},
	},
	getters: {
		text(state) {
			return state.text;
		},
		currentRowIndex(state) {
			return state.currentRowIndex;
		},
		currentSymbolIndex(state) {
			return state.currentSymbolIndex;
		},
		isWrong(state) {
			return state.isWrong;
		},
		errors(state) {
			return state.errorCounter;
		},
		enteredСharacters(state) {
			return state.enteredСharacters;
		},
		currentTime(state) {
			return state.currentTime;
		},
		
	},
	actions: {
		getAction({ commit }) {
			axios
				.get('https://baconipsum.com/api/?type=all-meat&paras=1&format=text')
				.then((text) => {
					commit('SET_TEXT_TO_STATE', text);
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		},
	},
	modules: {},
});

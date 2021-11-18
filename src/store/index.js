import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        text: "",
    },
    mutations: {
        SET_TEXT_TO_STATE: (state, text) => {
            state.text = text.data;
        },
    },
    getters: {
        TEXT(state) {
            return state.text;
        },
    },
    actions: {
        GET_TEXT_FROM_API({ commit }) {
            axios
                .get("https://baconipsum.com/api/?type=all-meat&paras=1&format=text")
                .then((text) => {
                    commit("SET_TEXT_TO_STATE", text);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    modules: {},
});

// import APIURL from "@/helpers/environment";

const state = () => ({
  error: "",
  confirmation: [],
});

const mutations = {
  setConfirmation(state, payload) {
    state.confirmation = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

const actions = {
  setDisplayValue({ commit }, displayValue) {
    commit("goDisplayValue", displayValue);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

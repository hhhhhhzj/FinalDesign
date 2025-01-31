import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {},
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value;
    },
    //控制侧边栏的展开
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    addCollect(state, value) {
      state.userInfo.collects.push(value)
    },
    clearUserInfo(state,value) {
      state.userInfo = {}
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    paths: ['isCollapsed', 'userInfo'] //控制是否持久华
  })],
});

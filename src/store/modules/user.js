import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login - 临时注释，用于接口联调测试
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      // 临时返回模拟数据，不调用真实API
      const mockToken = "mock-token-" + Date.now();
      commit("SET_TOKEN", mockToken);
      setToken(mockToken);
      resolve();

      /* 原登录API调用 - 临时注释
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      */
    });
  },

  // get user info - 临时注释，用于接口联调测试
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 临时返回模拟数据，不调用真实API
      const mockData = {
        name: "Test User",
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      };
      commit("SET_NAME", mockData.name);
      commit("SET_AVATAR", mockData.avatar);
      resolve(mockData);

      /* 原获取用户信息API调用 - 临时注释
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      */
    });
  },

  // user logout - 临时注释，用于接口联调测试
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 临时不调用真实API，直接清理本地状态
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      dispatch("tagsView/delAllViews", null, { root: true });
      resolve();

      /* 原登出API调用 - 临时注释
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      */
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

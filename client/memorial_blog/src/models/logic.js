import { login } from "../services/api";
import _ from "lodash";
export default {
  namespace: "logic",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *login({ payload }, { call, put }) {
      const data = yield call(login, payload);

      return data.data;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

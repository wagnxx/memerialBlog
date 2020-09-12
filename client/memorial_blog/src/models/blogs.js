import { getMenus, getArtContent, saveArt } from "../services/api";
import _ from "lodash";
import { message } from "antd";
import { cleanUserInfo } from "../utils/logic";
export default {
  namespace: "blogs",

  state: {
    artList: [
      // {
      //   groupName: "A类别",
      //   groupId: 1,
      //   items: [{ artId: 1, artTitle: "文章1" }],
      // },
    ],
    artContentMap: {},
  },

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
    *fetchArtList({ payload }, { call, put }) {
      const res = yield call(getMenus);
      // if (!res.data.data || res.data.errno !== 0) {
      //   cleanUserInfo();
      // }
      const groupsMap = _.groupBy(res.data.data, (g) => g.group_id);
      const groupMapKeys = Object.keys(groupsMap);

      const menu = groupMapKeys.map((k) => {
        let items = [];

        let groupArr = groupsMap[k];

        groupArr.forEach((item) => {
          items.push({
            artId: item.art_id,
            artTitle: item.title,
          });
        });

        let groupName = groupArr[0].name;

        return {
          groupId: k,
          groupName,
          items,
        };
      });

      yield put({
        type: "save",
        payload: {
          artList: menu,
        },
      });
    },
    *getArtContent({ payload }, { call, put }) {
      let keyLabel = payload.keyLabel;
      let data;
      try {
        data = yield call(getArtContent, payload);
        // 目前content的内容返回值只支持 一条数据 
        //  !!!!  数据验证优化待处理
        const content = data.data.data[0];

        yield put({
          type: "save2Level",
          payload: content,
          level2Key: keyLabel,
          level1Key: "artContentMap",
        });
        return content;
      } catch (error) {
        message.error(error.content);
      }
    },

    *saveArt({ payload }, { call, put }) {
      let data = yield call(saveArt, payload);
      return data;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    save2Level(state, action) {
      return (window.state = {
        ...state,
        [action.level1Key]: {
          ...state[action.level1Key],
          [action.level2Key]: action.payload,
        },
      });
    },
  },
};

import request from "../utils/request";

/**
 *  pre path config
 */
const prePath = 1 ? "api" : "/modck_api/";

/**
 * fetch list
 */

export const getMenus = (body) => request(`${prePath}/getMenus`, body, "POST");

export const login = (body) => request(`${prePath}/login`, body, "POST");
export const checkLogin = () => request(`${prePath}/isLogin`);

export const getArtContent = (body) =>
  request(`${prePath}/getArtContent`, body, "POST");

export const saveArt = (body) => request(`${prePath}/saveArt`, body, "POST");

export const getGroupList = (body) => request(`${prePath}/manage/getMenu`);

export const createMenu = (body) =>
  request(`${prePath}/manage/createMenu`, body, "POST");

export const createArt = (body) =>
  request(`${prePath}/manage/createArt`, body, "POST");

export const getUsers = (body) =>
  request(`${prePath}/manage/getUsers`);

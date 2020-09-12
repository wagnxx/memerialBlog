import { checkLogin } from "../services/api";

export const saveLocalUserInfo = (data) => {
  sessionStorage.setItem("user", JSON.stringify(data.data));
};
export const cleanUserInfo = () => {
  sessionStorage.setItem("user", '');
};

export const getCurrentUser =  () => {
  // sessionStorage.setItem('user',JSON.stringify(data.data))
  // let data = await checkLogin().then((res) => res.data);
  // if (data.errno !== 0) return null; // 未登录
  let user = sessionStorage.getItem("user");
  try {
    return JSON.parse(user) || null;
  } catch (error) {
    return null;
  }
};

export const getCurrentUserName =  () => {
  let user =  getCurrentUser();

  return (user && user.username) || "未登录";
};

export const getLogicStatus =  () => {
  let user =  getCurrentUser();

  return user;
};

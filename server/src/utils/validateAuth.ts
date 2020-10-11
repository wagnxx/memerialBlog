import { ErrorModel } from '../models/resModel';
import { Router, IContext } from '../ioc';
import { CODEMESSAGE } from '../config/resCode';
import { ROLEMAP } from '../config/sys.config';

export const checkLogin = async (ctx: IContext, next: () => Promise<any>) => {
  // console.log('开始验证  url:', ctx.request.url);
  // console.log('开始验证  session:', ctx.session);
  if (ctx.session.username) {
    await next();
    return;
  }

  ctx.body = new ErrorModel({
    code: CODEMESSAGE.UN_LOGIN.code,
    comment: CODEMESSAGE.UN_LOGIN.comment,
  });
};

export const checkIfSSVIP = async (ctx: IContext, next: () => Promise<any>) => {
  if (ctx.session.roleId === ROLEMAP.SSVIP.value) {
    await next();
    return;
  }

  forbiddenResCode(ctx);
};

export const checkIfSVIP = async (ctx: IContext, next: () => Promise<any>) => {
  if (ctx.session.roleId === ROLEMAP.SVIP.value) {
    await next();
    return;
  }

  forbiddenResCode(ctx);
};

export const checkIfVIP = async (ctx: IContext, next: () => Promise<any>) => {
  if (ctx.session.roleId === ROLEMAP.VIP.value) {
    await next();
    return;
  }

  forbiddenResCode(ctx);
};

function forbiddenResCode(ctx: IContext) {
  ctx.body = new ErrorModel({
    code: CODEMESSAGE.FORBIDDEN.code,
    comment: CODEMESSAGE.FORBIDDEN.comment,
  });
}

export const VALIDATE = {
  checkLogin,
  checkIfSSVIP,
  checkIfSVIP,
  checkIfVIP,
};

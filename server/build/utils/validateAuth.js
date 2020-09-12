"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resModel_1 = require("../models/resModel");
exports.default = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('开始验证  url:', ctx.request.url);
    if (ctx.session.username) {
        yield next();
        return;
    }
    console.log('没有登录，验证不过');
    ctx.body = new resModel_1.ErrorModel(null, '未登录');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryMiddlewareSetting = void 0;
const fs = require('fs');
const path = require('path');
// const morgan = require('koa-morgan');
const koa_generic_session_1 = __importDefault(require("koa-generic-session"));
var redisStore = require('koa-redis');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors'); //跨域处理
exports.entryMiddlewareSetting = (app) => {
    app.use(cors({
        // origin: function(ctx:Router.IRouterContext) { //设置允许来自指定域名请求
        //     if (ctx.url != '/test') {
        //         return '*'; // 允许来自所有域名请求
        //     }
        //     return '*'; //只允许http://localhost:8080这个域名的请求
        // },
        origin: '*',
        // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', '*'],
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    }));
    // add body parser
    app.use(bodyParser());
    const ENV = process.env.NODE_ENV;
    if (ENV !== 'production') {
        app.use(logger('dev', {
            stream: process.stdout,
        }));
    }
    else {
        // 若是线上环境
        const logFileName = path.join(__dirname, 'logs', 'access.log');
        const writeStream = fs.createWriteStream(logFileName, {
            // 创建文件的写入流
            flags: 'a',
        });
        app.use(logger('combined', {
            // dev 环境下： 输出
            stream: writeStream,
        }));
    }
    app.keys = ['wsyj33000'];
    app.use(koa_generic_session_1.default({
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }));
};

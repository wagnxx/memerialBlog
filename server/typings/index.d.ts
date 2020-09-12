// import session from 'koa-generic-session';
// import { Router } from 'node_modules/@types/koa-router';
// // import Koa from 'koa'
// declare module 'koa-router' {
//   //   export interface IRouterParamContext extends Router.IRouterParamContext {
//   //     session: session.Session | null;
//   //     readonly sessionOptions: session.SessionOptions | undefined;
//   //   }

//   //   export type RouterContext<StateT = any, CustomT = {}> =
//   //   Koa.ParameterizedContext<StateT, CustomT & IRouterParamContext<StateT, CustomT>>;

//   // For backward compatibility IRouterContext needs to be an interface
//   // But it's deprecated - please use `RouterContext` instead

//   // export interface IRouterContext <StateT = any, CustomT = {}> extends Router.IRouterContext  {
//   //   session: session.Session | null;
//   //   readonly sessionOptions: session.SessionOptions | undefined;
//   // }
// }

// // declare module 'koa'{
// //   export interface Context<StateT = any, CustomT = {}>{
// //     session: session.Session | null;
// //     readonly sessionOptions: session.SessionOptions | undefined;
// //   }
// // }
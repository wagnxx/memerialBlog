import 'reflect-metadata';
import './ioc/inversify.config';
import { Container, InversifyKoaServer, buildProviderModule } from './ioc';
import { entryMiddlewareSetting } from './utils/middleWare';
import { integrateGraphql } from './graphql';
import Koa from 'koa';
const koaApp = new Koa();
const container = new Container();
container.load(buildProviderModule());

// serveer setting config
const inverApp = new InversifyKoaServer(container, null, null, koaApp)
  .setConfig(entryMiddlewareSetting)
  .build();
// create httpServer
const httpServer = koaApp.listen(3000, () =>
  console.log(`koaServer is running over 3000 port`)
);
// 启动graphql服务
integrateGraphql(inverApp, httpServer).then((server) => {
  console.log(`graphql server is running over 3000 port`);
  // 个别服务无法使用时(目前是正常的) 可以在此处做一些滞后的工作
});

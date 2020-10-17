import 'reflect-metadata';
import './ioc/inversify.config';
import { Container, InversifyKoaServer, buildProviderModule } from './ioc';
import { entryMiddlewareSetting } from './utils/middleWare';
import { integrateGraphql } from './graphql';
import Koa from 'koa';
const app = new Koa();

const container = new Container();
container.load(buildProviderModule());
// create server

// serveer setting config
integrateGraphql(app, entryMiddlewareSetting).then((sever) => {
  const inverServer = new InversifyKoaServer(container, null, null, app);
  inverServer.build().listen(3000, () => {
    console.log(`server is running over 3000 port`);
  });
});

// const server = new InversifyKoaServer(container);
// server
//   .setConfig(entryMiddlewareSetting)
//   .build()
//   .listen(3000, () => {
//     console.log(`server is running over 3000 port`);
//   });

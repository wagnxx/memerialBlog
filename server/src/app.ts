import 'reflect-metadata';
import './ioc/inversify.config';
import { Container, InversifyKoaServer, buildProviderModule } from './ioc';
import { entryMiddlewareSetting } from './utils/middleWare';
import { integrateGraphql } from './graphql';

const container = new Container();
container.load(buildProviderModule());
// create server

// serveer setting config
const app = new InversifyKoaServer(container, null, null, null)
  .setConfig(entryMiddlewareSetting)
  .build();
// 启动graphql服务
integrateGraphql(app, entryMiddlewareSetting).then((sever) => {
  app.listen(3000, () => {
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

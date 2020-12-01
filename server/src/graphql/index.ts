import path = require('path');
import { buildSchema, NonEmptyArray } from 'type-graphql';
import Koa from 'koa';
import { ApolloServer,PubSub } from 'apollo-server-koa';

// 获取匹配所有resolver的路径
function getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
  return [path.resolve(__dirname, 'resolvers/*.ts')];
}

// 通过buildSchema方法来生成graphql schema
export async function getSchema() {
  return buildSchema({
    resolvers: getResolvers(),
  });
}

const pubsub = new PubSub();

export async function integrateGraphql(
  app: Koa<Koa.DefaultState, Koa.DefaultContext>,
  httpServer
) {
  const server = new ApolloServer({
    schema: await getSchema(),
    // subscriptions:{
    //   path:'/sub'
    // },
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    } as any,
    introspection: true,
    context: ({ ctx, pubsub }) => ctx,
  });
  server.applyMiddleware({ app, cors: true,path:'/graphql' });
  server.installSubscriptionHandlers(httpServer);
  return server;
}

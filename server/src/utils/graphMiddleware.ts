import Koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'type-graphql';
import { ArtResolver } from '../graphql/resolvers/ArtResolver';
import Arts from '../models/art.model';
// import schema from '../graphql/schema';
// import root from '../graphql/resolvers/resolver';
// const app = new Koa();

// app.use(
//   mount(
//     '/graphql',
//     graphqlHTTP({
//       schema: schema,
//       rootValue: root,
//       graphiql: true,
//     })
//   )
// );

// const customMount = async (ctx, next) =>
//   mount(
//     '/graphql',
//     graphqlHTTP({
//       schema: await buildSchema({
//         resolvers: [ArtResolver],
//       }),
//       graphiql: true,
//     })
//   );

// export default customMount;

// export default  mount(
//   '/graphql',
//   graphqlHTTP({
//     schema: await buildSchema({
//       resolvers:[Art ]
//     }),
//     // rootValue: root,
//     graphiql: true,
//   })
// );

// app.listen(5000);
// console.log('server started at http://localhost:3000');

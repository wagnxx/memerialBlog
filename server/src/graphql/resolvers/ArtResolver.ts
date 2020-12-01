import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  InputType,
  Field,
  Subscription,
  Publisher,
  PubSub,
  Root,
} from 'type-graphql';
import Arts from '../../models/art.model';
import { Op } from 'sequelize';

@InputType()
class ArtGraphType {
  @Field()
  title: string;

  @Field(() => Int)
  created_id: number;
}

@Resolver()
export class ArtResolver {
  @Query(() => [Arts])
  async arts() {
    let result = await Arts.findAll({
      limit: 3,
    });

    return result;
  }

  @Mutation(() => Arts)
  async getArtById(@Arg('id', () => Int) id: number) {
    return Arts.findOne({ where: { id } });
  }

  @Mutation(() => [Arts])
  async getArtByIdAndLimt(
    @Arg('startId', () => Int) id: number,
    @Arg('limit', () => Int) limit: number
  ) {
    return Arts.findAll({
      where: {
        id: {
          [Op.gte]: true,
        },
      },
      limit,
    });
  }

  @Mutation(() => Boolean)
  async updateItem(@PubSub('UPDATE_ITEM') publish: Publisher<Arts>) {
    let itemArt = await Arts.findOne({
      where: {
        id: 1,
      },
    });
    itemArt.title = 'update time' + Date.now();

    await itemArt.save();

   await publish(itemArt);

    return true;
  }

  @Subscription((returns) => Arts, {
    topics: 'UPDATE_ITEM',
  })
  async itemUpdate(@Root() art: Arts) {
    return art;
  }
}

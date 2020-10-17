import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  InputType,
  Field,
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
    let result = await Arts.findAll();

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
}

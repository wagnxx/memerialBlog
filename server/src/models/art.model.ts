import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  Scopes,
} from 'sequelize-typescript';
import GroupArts from './groupArt.model';
import UsersModel from './user.model';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Scopes({
  ssArt: {
    include: [
      {
        model: () => UsersModel,
        attributes: [],
        where: { id: 1 },
      },
    ],
  },
})
@Table({ tableName: 'arts' })
export default class Arts extends Model<Arts> {
  // @PrimaryKey
  // @Column
  // id: number;

  @Field()
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Field(() => Int)
  @ForeignKey(() => UsersModel)
  created_id: string;

  @HasMany(() => GroupArts)
  groupArts: GroupArts[];

  @BelongsTo(() => UsersModel)
  u: UsersModel;
}

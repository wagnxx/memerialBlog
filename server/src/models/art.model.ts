import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import GroupArts from './groupArt.model';
import UsersModel from './user.model';

@Table({ tableName: 'arts' })
export default class Arts extends Model<Arts> {
  // @PrimaryKey
  // @Column
  // id: number;

  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => UsersModel)
  @Column(DataType.TEXT)
  created_id: string;

  @HasMany(() => GroupArts)
  groupArts: GroupArts[];

  @BelongsTo(() => UsersModel)
  u: UsersModel;
}

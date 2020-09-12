import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import Groups from './group.model';
import Arts from './art.model';
import UsersModel from './user.model';

@Table({
  tableName: 'group_arts',
})
export default class GroupArts extends Model<GroupArts> {
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Groups)
  @Column
  group_id: number;
  
  @ForeignKey(() => Arts)
  @Column
  art_id: number;


  @BelongsTo(() => Groups)
  g: Groups;

  @BelongsTo(() => Arts)
  a: Arts;

  // @BelongsTo(() => UsersModel)
  // u: UsersModel;
}








































// @Table
// class Player extends Model<Player> {

//   @Column
//   name: string;

//   @Column
//   num: number;

//   @ForeignKey(() => Team)
//   @Column
//   teamId: number;

//   @BelongsTo(() => Team)
//   team: Team;
// }

// @Table
// class Team extends Model<Team> {

//   @Column
//   name: string;

//   @HasMany(() => Player)
//   players: Player[];
// }

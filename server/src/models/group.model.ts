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

@Table({ tableName: 'groups' })
export default class Groups extends Model<Groups> {
 
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  // group_id: number;



  @HasMany(() => GroupArts)
  groupArts: GroupArts[];
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

import { Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

@Table
class Player extends Model<Player,any> {

  @Column
  name: string;

  @Column
  num: number;

//   @ForeignKey(() => Team)
  @Column
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;
}

@Table
class Team extends Model<Team> {

  @Column
  name: string;

  @HasMany(() => Player)
  players: Player[];
}
// export declare type ModelClassGetter = (returns?: void) => typeof Model;
// 
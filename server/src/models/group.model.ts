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
  BelongsToMany,
} from 'sequelize-typescript';
import GroupArts from './groupArt.model';
import Arts from './art.model';

@Scopes({
  arts: {
    include: [
      {
        model: () => Arts.scope('ssArt'),
        attributes: {
          include: ['title','id'],
          exclude:['content']
        },
        where: { id: 1 },
      },
    ],
  },
})
@Table({ tableName: 'groups' })
export default class Groups extends Model<Groups> {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  // group_id: number;

  @BelongsToMany(() => Arts, { through: () => GroupArts })
  arts: Arts[];
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

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ProjectUpdates from './projectUpdates';

@Entity()
class UpdatePoints extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    description: string;

  @ManyToOne(() => ProjectUpdates, (update) => update.points, { onDelete: 'CASCADE' })
    update: ProjectUpdates;
}

export default UpdatePoints;

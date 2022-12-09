import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Projects from './projects';
import UpdatePoints from './updatePoints';

enum UpdateType {
  NEW = 'new',
  IMPROVEMENT = 'improvement',
  ANNOUNCEMENT = 'announcement',
  BUGFIX = 'bugfix',
}

@Entity()
class ProjectUpdates extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    title: string;

  @Column({ nullable: true })
    description: string;

  @Column({ type: 'enum', enum: UpdateType, default: UpdateType.ANNOUNCEMENT })
    type: UpdateType;

  @CreateDateColumn()
    createdAt: Date;

  @OneToMany(() => UpdatePoints, (point) => point.update)
    points: UpdatePoints[];

  @ManyToOne(() => Projects, (project) => project.updates, { onDelete: 'CASCADE' })
    project: Projects;
}

export default ProjectUpdates;

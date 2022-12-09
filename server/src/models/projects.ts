import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import ProjectUpdates from './projectUpdates';
import Users from './users';

@Entity()
class Projects extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ unique: true })
    name: string;

  @Column()
    description: string;

  @CreateDateColumn()
    createdAt: Date;

  @OneToMany(() => ProjectUpdates, (update) => update.project)
    updates: ProjectUpdates[];

  @ManyToOne(() => Users, (user) => user.projects, { onDelete: 'CASCADE' })
    creator: Users;
}

export default Projects;

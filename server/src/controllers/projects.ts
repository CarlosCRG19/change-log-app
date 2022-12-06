import { Response, Request } from 'express';

import { NoEntityFoundError } from '@/errors';
import { Projects } from '@/models';

export const getList = async (_: Request, res: Response): Promise<void> => {
  try {
    const projects = await Projects.find();

    if (projects === undefined || (projects.length === 0)) throw new NoEntityFoundError(Projects.name);

    res.status(200).json({ projects });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = Projects.create(req.body);

    await project.save();

    res.status(201).json({ project });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project == null) throw new NoEntityFoundError(Projects.name);

    res.status(200).json({ project });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project === null) throw new NoEntityFoundError(Projects.name);

    Object.assign(project, req.body);

    await project.save();

    res.status(200).json({ project });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project === null) throw new NoEntityFoundError(Projects.name);

    await project.remove();

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error });
  }
};

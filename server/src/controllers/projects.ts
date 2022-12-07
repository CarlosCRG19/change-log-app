import { Response, Request } from 'express';
import { Raw, FindOperator } from 'typeorm';

import { NoEntityFoundError } from '@/errors';
import { Projects } from '@/models';

interface ProjectsFilters {
  name?: FindOperator<any>
  createdAt?: FindOperator<any>
}

const isValidString = (value: any): boolean => value !== undefined && typeof value === 'string';

const getProjectsFilters = (req: Request): ProjectsFilters => {
  const filters: ProjectsFilters = {};

  if (isValidString(req.query.name)) {
    const name = req.query.name as string;

    filters.name = Raw((alias) => `LOWER(${alias}) LIKE LOWER(:name)`, { name: `%${name}%` });
  }

  if (isValidString(req.query.startDate) && isValidString(req.query.endDate)) {
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);

    if (endDate > startDate) {
      filters.createdAt = Raw((alias) => `${alias} > :startDate AND ${alias} < :endDate`, { startDate, endDate });
    }
  } else if (isValidString(req.query.startDate)) {
    const startDate = new Date(req.query.startDate as string);

    filters.createdAt = Raw((alias) => `${alias} > :startDate`, { startDate });
  } else if (isValidString(req.query.endDate)) {
    const endDate = new Date(req.query.endDate as string);

    filters.createdAt = Raw((alias) => `${alias} < :endDate`, { endDate });
  }

  return filters;
};

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = getProjectsFilters(req);

    const projects = await Projects.find({
      order: { createdAt: 'DESC' },
      where: { ...filters },
    });

    if (projects === undefined || (projects.length === 0)) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = Projects.create(req.body);

    await project.save();

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project === null) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project === null) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    Object.assign(project, req.body);

    await project.save();

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    if (project === null) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    await project.remove();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

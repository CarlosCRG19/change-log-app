import { Response, Request } from 'express';
import { Raw, FindOperator } from 'typeorm';

import { NoEntityFoundError } from '@/errors';
import { Pagination } from '@/lib';
import { Projects, Users } from '@/models';

interface ProjectsFilters {
  name?: FindOperator<any>
  createdAt?: FindOperator<any>
  creator?: {
    username: FindOperator<any>
  }
}

const isValidString = (value: any): boolean => (
  value !== undefined &&
  (typeof value === 'string' ||
  value instanceof String)
);

const getProjectsFilters = (req: Request): ProjectsFilters => {
  const filters: ProjectsFilters = {};

  if (isValidString(req.query.name)) {
    const name = req.query.name as string;

    filters.name = Raw((alias) => `LOWER(${alias}) LIKE LOWER(:name)`, { name: `%${name}%` });
  }

  if (isValidString(req.query.creator)) {
    const creator = req.query.creator as string;

    filters.creator = { username: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:creator)`, { creator: `%${creator}%` }) };
  }

  if (isValidString(req.query.startDate) && isValidString(req.query.endDate)) {
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    if (endDate.getTime() > startDate.getTime()) {
      filters.createdAt = Raw((alias) => `${alias} >= :startDate AND ${alias} <= :endDate`, { startDate, endDate });
    }
  } else if (isValidString(req.query.startDate)) {
    const startDate = new Date(req.query.startDate as string);
    startDate.setUTCHours(0, 0, 0, 0);

    filters.createdAt = Raw((alias) => `${alias} >= :startDate`, { startDate });
  } else if (isValidString(req.query.endDate)) {
    const endDate = new Date(req.query.endDate as string);
    endDate.setUTCHours(23, 59, 59, 999);

    filters.createdAt = Raw((alias) => `${alias} <= :endDate`, { endDate });
  }

  return filters;
};

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = getProjectsFilters(req);

    const pagination = new Pagination();

    if (req.query.page !== undefined && !Number.isNaN(req.query.page)) {
      pagination.page = parseInt(req.query.page as string);
    }

    if (req.query.perPage !== undefined && !Number.isNaN(req.query.perPage)) {
      pagination.perPage = parseInt(req.query.perPage as string);
    }

    const [projects, totalProjects] = await Projects.findAndCount({
      order: { createdAt: 'DESC' },
      where: { ...filters },
      relations: ['creator'],
      take: pagination.perPage,
      skip: pagination.offset,
    });

    if (projects === undefined || (projects.length === 0)) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    res.status(200).json({
      projects: projects.map((project) => ({ ...project, creator: project.creator.username })),
      count: projects.length,
      pagination: {
        page: pagination.page,
        perPage: pagination.perPage,
        totalPages: pagination.calculateTotalPages(totalProjects),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const creator = await Users.findOneBy({ id: req.userId });
    const project = Projects.create({ ...req.body, creator });

    await project.save();

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOne({
      where: { id: req.params.projectId },
      relations: ['creator'],
    });

    if (project === null) {
      res.status(404).json({ error: new NoEntityFoundError(Projects.name) });
      return;
    }

    res.status(200).json({ project: { ...project, creator: project.creator.username } });
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

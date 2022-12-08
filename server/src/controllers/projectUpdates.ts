import { Response, Request } from 'express';

import { InvalidUpdatePointsError, NoEntityFoundError } from '@/errors';
import { Projects, ProjectUpdates, UpdatePoints } from '@/models';

interface ProjectUpdateDTO {
  id: string
  title: string
  description?: string
  type: string
  points: string[]
}

const isString = (value: unknown): boolean => typeof value === 'string';
const isStringArray = (array: unknown): boolean => Array.isArray(array) && array.length > 0 && array.every(isString);

const createUpdatePoint = (update: ProjectUpdates) => async (description: string) => {
  const updatePoint = UpdatePoints.create({ description, update });

  await updatePoint.save();
};

const processUpdates = (updates: ProjectUpdates[]): ProjectUpdateDTO[] => updates.map(update => {
  const points: string[] = update.points.map(point => point.description);

  return { ...update, points };
});

export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates = await ProjectUpdates.find({
      where: { project: { id: req.params.projectId } },
      relations: ['points'],
    });

    if (updates === undefined || (updates.length === 0)) {
      res.status(404).json({ error: new NoEntityFoundError(ProjectUpdates.name) });
      return;
    }

    res.status(200).json({ updates: processUpdates(updates) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findOneBy({ id: req.params.projectId });

    const { points, ...updateInfo } = req.body;

    const update = ProjectUpdates.create({ ...updateInfo, project });

    await update.save();

    if (points !== undefined) {
      if (isStringArray(points)) {
        await points.forEach(createUpdatePoint(update));
      } else {
        res.status(400).json({ error: new InvalidUpdatePointsError(points.toString()) });
      }
    }

    res.status(201).json({ update });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const update = await ProjectUpdates.findOneBy({ id: req.params.updateId });

    if (update === null) {
      res.status(404).json({ error: new NoEntityFoundError(ProjectUpdates.name) });
      return;
    }

    await update.remove();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!', ...error });
  }
};

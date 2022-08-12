import { Metadata } from '../models/metamodel.model';

export class ProjectMetadataDTO {
  text: string;

  title: string;

  resourceNumber: number;

  totalNumber: number;

  projectId: string;

  ordinalNumber: number;

  fields: Metadata[];
}

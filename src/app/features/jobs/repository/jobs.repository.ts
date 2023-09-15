import { DatabaseConnection } from '../../../../main/database/typeorm.connection';
import { Job } from '../../../models/job.model';
import { JobEntity } from '../../../shared/entities';
import { CreateJobDTO } from '../DTO';

export class JobsRepository {
	private _manager = DatabaseConnection.connection.manager;

	async save(job: CreateJobDTO): Promise<Job> {
		const createdJob = this._manager.create(JobEntity, {
			...job,
		});

		await this._manager.save(createdJob);

		return this.entityToModel(createdJob);
	}

	async getJobByID(idJob: string): Promise<Job | undefined> {
		const job = await this._manager.findOneBy(JobEntity, { id: idJob });

		if (!job) return undefined;

		return this.entityToModel(job);
	}

	private entityToModel({
		id,
		description,
		isOpen,
		limitDate,
		idRecruiter,
		companyName,
		maxCandidate,
	}: JobEntity): Job {
		return new Job(id, description, companyName, limitDate, isOpen, idRecruiter, maxCandidate);
	}
}

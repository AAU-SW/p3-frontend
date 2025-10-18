type Asset = {
	id?: string;
	name: string;
	registrationNumber: string;
	status: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	createdBy?: User;
};

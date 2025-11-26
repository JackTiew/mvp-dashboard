// Report interface for Data Connector
export interface IReport {
	id: string;
	name: string;
	description: string;
	type: 'csv' | 'pdf' | 'xlsx';
	size: string;
	uploadedAt: string;
	downloadUrl: string;
}

export interface IUploadResponse {
	success: boolean;
	message: string;
	file?: {
		id: string;
		name: string;
		size: number;
		uploadedAt: string;
	};
}


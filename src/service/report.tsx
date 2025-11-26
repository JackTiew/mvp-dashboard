// Service for report-related API calls
import { httpClient } from '../http';
import type { IReport, IUploadResponse } from '../interface/report';

export const getReports = async (): Promise<IReport[]> => {
	const response = await httpClient.get<IReport[]>('/api/v1/reports');
	return response.data;
};

export const uploadReport = async (file: File): Promise<IUploadResponse> => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await httpClient.post<IUploadResponse>(
		'/api/v1/reports/upload',
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};


// Mock Service Worker handlers for API endpoints
import { http, HttpResponse } from 'msw';
import { mockRules, mockCases, mockMetrics, mockReports, mockDashboard } from './data';
import type { ICreateRuleReq, IRule } from '../interface/rule';
import type { ICase } from '../interface/case';
import type { ICaseActionReq } from '../interface/case';
import type { IReport } from '../interface/report';

const BASE_URL = 'http://localhost:3000';

export const handlers = [
	// POST /api/v1/auth/login - User authentication
	http.post(`${BASE_URL}/api/v1/auth/login`, async ({ request }) => {
		const body = (await request.json()) as {
			username: string;
			password: string;
		};

		// Mock authentication - only accept admin/admin
		if (body.username === 'admin' && body.password === 'admin') {
			return HttpResponse.json({
				success: true,
				username: body.username,
				message: 'Login successful',
			});
		}

		return HttpResponse.json(
			{ success: false, message: 'Invalid credentials' },
			{ status: 401 }
		);
	}),

	// GET /api/v1/rules - List all rules
	http.get(`${BASE_URL}/api/v1/rules`, () => {
		return HttpResponse.json(mockRules);
	}),

	// POST /api/v1/rules - Create new rule
	http.post(`${BASE_URL}/api/v1/rules`, async ({ request }) => {
		const body = (await request.json()) as ICreateRuleReq;
		const newRule: IRule = {
			id: `rule_${Date.now()}`,
			...body,
			status: body.enabled ? 'enabled' : 'disabled',
			lastUpdated: new Date().toISOString(),
			createdAt: new Date().toISOString(),
		};
		mockRules.push(newRule);
		return HttpResponse.json(newRule, { status: 201 });
	}),

	// PUT /api/v1/rules/:id - Update existing rule
	http.put(`${BASE_URL}/api/v1/rules/:id`, async ({ params, request }) => {
		const { id } = params;
		const body = (await request.json()) as ICreateRuleReq;
		const ruleIndex = mockRules.findIndex((r) => r.id === id);

		if (ruleIndex === -1) {
			return HttpResponse.json(
				{ error: 'Rule not found' },
				{ status: 404 }
			);
		}

		const updatedRule: IRule = {
			...mockRules[ruleIndex],
			...body,
			status: body.enabled ? 'enabled' : 'disabled',
			lastUpdated: new Date().toISOString(),
		};
		mockRules[ruleIndex] = updatedRule;
		return HttpResponse.json(updatedRule);
	}),

	// DELETE /api/v1/rules/:id - Delete rule
	http.delete(`${BASE_URL}/api/v1/rules/:id`, ({ params }) => {
		const { id } = params;
		const ruleIndex = mockRules.findIndex((r) => r.id === id);

		if (ruleIndex === -1) {
			return HttpResponse.json(
				{ error: 'Rule not found' },
				{ status: 404 }
			);
		}

		mockRules.splice(ruleIndex, 1);
		return HttpResponse.json({ success: true });
	}),

	// GET /api/v1/cases - List cases with pagination
	http.get(`${BASE_URL}/api/v1/cases`, ({ request }) => {
		const url = new URL(request.url);
		const status = url.searchParams.get('status') || 'open';
		const page = parseInt(url.searchParams.get('page') || '1');
		const pageSize = parseInt(url.searchParams.get('page_size') || '20');

		// Filter by status
		const filteredCases = mockCases.filter((c) =>
			status === 'all' ? true : c.status === status
		);

		// Paginate
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedCases = filteredCases.slice(startIndex, endIndex);

		return HttpResponse.json({
			cases: paginatedCases,
			total: filteredCases.length,
			page,
			page_size: pageSize,
			total_pages: Math.ceil(filteredCases.length / pageSize),
		});
	}),

	// POST /api/v1/cases/:id/action - Perform action on case
	http.post(
		`${BASE_URL}/api/v1/cases/:id/action`,
		async ({ params, request }) => {
			const { id } = params;
			const body = (await request.json()) as ICaseActionReq;
			const caseIndex = mockCases.findIndex((c) => c.id === id);

			if (caseIndex === -1) {
				return HttpResponse.json(
					{ error: 'Case not found' },
					{ status: 404 }
				);
			}

			// Update case status based on action
			const statusMap: Record<
				string,
				'held' | 'released' | 'callback_done'
			> = {
				hold: 'held',
				release: 'released',
				callback_done: 'callback_done',
			};

			const updatedCase: ICase = {
				...mockCases[caseIndex],
				status:
					statusMap[body.payload.action] ||
					mockCases[caseIndex].status,
			};
			mockCases[caseIndex] = updatedCase;

			return HttpResponse.json({ success: true, case: updatedCase });
		}
	),

	// GET /api/v1/metrics - Get metrics data
	http.get(`${BASE_URL}/api/v1/metrics`, () => {
		return HttpResponse.json(mockMetrics);
	}),

	// GET /api/v1/reports - Get all reports
	http.get(`${BASE_URL}/api/v1/reports`, () => {
		return HttpResponse.json(mockReports);
	}),

	// POST /api/v1/reports/upload - Upload a new report
	http.post(`${BASE_URL}/api/v1/reports/upload`, async ({ request }) => {
		// Simulate upload delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Randomly simulate upload failure (10% chance)
		if (Math.random() < 0.1) {
			return HttpResponse.json(
				{
					success: false,
					message:
						'Upload failed due to network error. Please try again.',
				},
				{ status: 500 }
			);
		}

		// Get the form data
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return HttpResponse.json(
				{
					success: false,
					message: 'No file provided',
				},
				{ status: 400 }
			);
		}

		// Create new report entry
		const fileExt = file.name.split('.').pop()?.toLowerCase() as
			| 'csv'
			| 'pdf'
			| 'xlsx';
		const newReport: IReport = {
			id: `report_${Date.now()}`,
			name: file.name,
			description: `User uploaded file - ${file.name}`,
			type: fileExt || 'csv',
			size: `${(file.size / 1024).toFixed(1)} KB`,
			uploadedAt: new Date().toISOString(),
			downloadUrl: `/mock/reports/${file.name}`,
		};

		// Add to mock data
		mockReports.unshift(newReport);

		return HttpResponse.json({
			success: true,
			message: 'File uploaded successfully',
			file: {
				id: newReport.id,
				name: newReport.name,
				size: file.size,
				uploadedAt: newReport.uploadedAt,
			},
		});
	}),

	// GET /api/v1/dashboard - Get dashboard data
	http.get(`${BASE_URL}/api/v1/dashboard`, () => {
		return HttpResponse.json(mockDashboard);
	}),
];

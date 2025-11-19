// Mock data for development
import type { IRule } from '../interface/rule';
import type { ICase } from '../interface/case';
import type { IMetrics } from '../interface/metric';

export const mockRules: IRule[] = [
	{
		id: 'rule_1',
		name: 'Bank Account Change Detection',
		type: 'bank_change',
		threshold: 3,
		window: 24,
		enabled: true,
		status: 'enabled',
		lastUpdated: '2025-10-20T14:30:00Z',
		createdAt: '2025-09-15T10:00:00Z',
	},
	{
		id: 'rule_2',
		name: 'Duplicate Transaction Check',
		type: 'duplicate',
		threshold: 2,
		window: 1,
		enabled: true,
		status: 'enabled',
		lastUpdated: '2025-10-18T09:15:00Z',
		createdAt: '2025-09-10T08:00:00Z',
	},
	{
		id: 'rule_3',
		name: 'Over Limit Transactions',
		type: 'over_limit',
		threshold: 5000,
		window: 12,
		enabled: false,
		status: 'disabled',
		lastUpdated: '2025-10-15T16:45:00Z',
		createdAt: '2025-09-05T11:30:00Z',
	},
	{
		id: 'rule_4',
		name: 'High Frequency Bank Changes',
		type: 'bank_change',
		threshold: 5,
		window: 48,
		enabled: true,
		status: 'enabled',
		lastUpdated: '2025-10-22T11:20:00Z',
		createdAt: '2025-09-20T14:00:00Z',
	},
];

export const mockCases: ICase[] = [
	{
		id: 'case_1',
		decision: 'review',
		reasons: [
			'Bank account changed within 24h',
			'Amount exceeds daily limit',
		],
		vendor: 'Amazon',
		amount: 1250.0,
		created_at: '2025-10-23T08:30:00Z',
		status: 'open',
		input: {
			transaction_id: 'txn_abc123',
			user_id: 'user_001',
			vendor: 'Amazon',
			amount: 1250.0,
			bank_account: '****1234',
			timestamp: '2025-10-23T08:30:00Z',
		},
		checks: [
			{
				rule_id: 'rule_1',
				rule_name: 'Bank Account Change Detection',
				rule_type: 'bank_change',
				matched: true,
				details: 'Bank account was changed 8 hours ago',
			},
			{
				rule_id: 'rule_3',
				rule_name: 'Over Limit Transactions',
				rule_type: 'over_limit',
				matched: true,
				details: 'Amount $1250.00 exceeds daily limit of $1000.00',
			},
		],
	},
	{
		id: 'case_2',
		decision: 'reject',
		reasons: ['Duplicate transaction detected'],
		vendor: 'Netflix',
		amount: 15.99,
		created_at: '2025-10-23T07:15:00Z',
		status: 'open',
		input: {
			transaction_id: 'txn_def456',
			user_id: 'user_002',
			vendor: 'Netflix',
			amount: 15.99,
			bank_account: '****5678',
			timestamp: '2025-10-23T07:15:00Z',
		},
		checks: [
			{
				rule_id: 'rule_2',
				rule_name: 'Duplicate Transaction Check',
				rule_type: 'duplicate',
				matched: true,
				details: 'Same transaction was processed 15 minutes ago',
			},
		],
	},
	{
		id: 'case_3',
		decision: 'approve',
		reasons: [],
		vendor: 'Starbucks',
		amount: 8.5,
		created_at: '2025-10-23T06:45:00Z',
		status: 'released',
		input: {
			transaction_id: 'txn_ghi789',
			user_id: 'user_003',
			vendor: 'Starbucks',
			amount: 8.5,
			bank_account: '****9012',
			timestamp: '2025-10-23T06:45:00Z',
		},
		checks: [],
	},
	{
		id: 'case_4',
		decision: 'review',
		reasons: ['Multiple bank changes in short period'],
		vendor: 'Apple Store',
		amount: 999.0,
		created_at: '2025-10-22T18:20:00Z',
		status: 'held',
		input: {
			transaction_id: 'txn_jkl012',
			user_id: 'user_004',
			vendor: 'Apple Store',
			amount: 999.0,
			bank_account: '****3456',
			timestamp: '2025-10-22T18:20:00Z',
		},
		checks: [
			{
				rule_id: 'rule_4',
				rule_name: 'High Frequency Bank Changes',
				rule_type: 'bank_change',
				matched: true,
				details: '3 bank account changes detected in 48 hours',
			},
		],
	},
	{
		id: 'case_5',
		decision: 'review',
		reasons: ['Amount over threshold'],
		vendor: 'Best Buy',
		amount: 3500.0,
		created_at: '2025-10-22T15:10:00Z',
		status: 'open',
		input: {
			transaction_id: 'txn_mno345',
			user_id: 'user_005',
			vendor: 'Best Buy',
			amount: 3500.0,
			bank_account: '****7890',
			timestamp: '2025-10-22T15:10:00Z',
		},
		checks: [
			{
				rule_id: 'rule_3',
				rule_name: 'Over Limit Transactions',
				rule_type: 'over_limit',
				matched: true,
				details: 'Amount exceeds limit by $2500.00',
			},
		],
	},
];

// Generate more mock cases for pagination testing
for (let i = 6; i <= 50; i++) {
	const decisions: Array<'approve' | 'reject' | 'review'> = [
		'approve',
		'reject',
		'review',
	];
	const statuses: Array<'open' | 'held' | 'released'> = [
		'open',
		'held',
		'released',
	];

	mockCases.push({
		id: `case_${i}`,
		decision: decisions[Math.floor(Math.random() * 3)],
		reasons:
			i % 3 === 0 ? ['Bank account changed', 'Suspicious activity'] : [],
		vendor: ['Amazon', 'Walmart', 'Target', 'eBay', 'PayPal'][
			Math.floor(Math.random() * 5)
		],
		amount: Math.floor(Math.random() * 5000) + 10,
		created_at: new Date(
			Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
		).toISOString(),
		status: statuses[Math.floor(Math.random() * 3)],
		input: {
			transaction_id: `txn_${i}`,
			user_id: `user_${String(i).padStart(3, '0')}`,
			vendor: ['Amazon', 'Walmart', 'Target', 'eBay', 'PayPal'][
				Math.floor(Math.random() * 5)
			],
			amount: Math.floor(Math.random() * 5000) + 10,
			bank_account: `****${String(
				Math.floor(Math.random() * 9999)
			).padStart(4, '0')}`,
			timestamp: new Date(
				Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
			).toISOString(),
		},
		checks: [],
	});
}

export const mockMetrics: IMetrics = {
	exceptions_by_type: {
		bank_change: 24,
		duplicate: 18,
		over_limit: 12,
	},
	prevented_loss_series: [
		{ date: '2025-10-17', amount: 15000 },
		{ date: '2025-10-18', amount: 18500 },
		{ date: '2025-10-19', amount: 22000 },
		{ date: '2025-10-20', amount: 19500 },
		{ date: '2025-10-21', amount: 25000 },
		{ date: '2025-10-22', amount: 28000 },
		{ date: '2025-10-23', amount: 31500 },
	],
};

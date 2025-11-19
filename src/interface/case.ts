import type { RuleType } from './rule';

export type CaseStatus = 'open' | 'held' | 'released' | 'callback_done';
export type CaseAction = 'hold' | 'release' | 'callback_done';
export type CaseDecision = 'approve' | 'reject' | 'review';

export interface ICaseActionPayload {
	action: CaseAction;
}

export interface IGetCaseListReq {
	status: string;
	page: number;
	pageSize: number;
}

export interface ICaseActionReq {
	id: string;
	payload: ICaseActionPayload;
}

export interface ICaseCheck {
	rule_id: string;
	rule_name: string;
	rule_type: RuleType;
	matched: boolean;
	details: string;
}

export interface ICase {
	id: string;
	decision: CaseDecision;
	reasons: string[];
	vendor: string;
	amount: number;
	created_at: string;
	status: CaseStatus;
	input: {
		transaction_id: string;
		user_id: string;
		vendor: string;
		amount: number;
		bank_account: string;
		timestamp: string;
	};
	checks: ICaseCheck[];
}

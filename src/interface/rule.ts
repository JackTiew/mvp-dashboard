export type RuleType = 'bank_change' | 'duplicate' | 'over_limit';
export type RuleStatus = 'enabled' | 'disabled';

export interface IRule {
	id: string;
	name: string;
	type: RuleType;
	threshold: number;
	window: number;
	enabled: boolean;
	status: RuleStatus;
	lastUpdated: string;
	createdAt: string;
}

export interface ICreateRuleReq {
	name: string;
	type: RuleType;
	threshold: number;
	window: number;
	enabled: boolean;
}

export interface IUpdateRuleReq extends ICreateRuleReq {
	id: string;
}

export interface RuleFormProps {
	rule?: IRule;
	onSuccess: () => void;
	onCancel: () => void;
}

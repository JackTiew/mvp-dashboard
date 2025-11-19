export interface IExceptionsByType {
	[key: string]: number;
}

export interface IPreventedLossPoint {
	date: string;
	amount: number;
}

export interface IMetrics {
	exceptions_by_type: IExceptionsByType;
	prevented_loss_series: IPreventedLossPoint[];
}

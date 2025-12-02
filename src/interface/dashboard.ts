export interface KPIData {
  tasks: number;
  incidents: number;
  integrityScore: number;
  integrityChange: number;
}

export interface IncidentItem {
  key: string;
  id: string;
  title: string;
  risk: 'High' | 'Medium' | 'Low';
}

export interface TaskItem {
  key: string;
  title: string;
  dueDate: string;
}

export interface DetailedIncidentItem {
  key: string;
  id: string;
  title: string;
  status: string;
}

export interface ChartData {
  labels: string[];
  values: number[];
}

export interface AIInsight {
  title: string;
  points: string[];
  footer: string;
}

export interface DashboardData {
  kpi: KPIData;
  openIncidents: IncidentItem[];
  tasks: TaskItem[];
  detailedIncidents: DetailedIncidentItem[];
  requestsOverTime: ChartData;
  integrityTrend: ChartData;
  governanceActivities: ChartData;
  aiInsight: AIInsight;
}


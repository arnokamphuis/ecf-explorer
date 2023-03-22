export type Deliverables = {
	[role: string]: Deliverable;
};

export type Deliverable = {
	accountable: string[];
	responsible: string[];
	contributor: string[];
} & Record<string, string[]>;

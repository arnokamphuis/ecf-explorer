export type Competencies = {
    [competency: string]: Competency
}

export type Competency = {
    description: string;
    phase: Phase;
    levels: CompetencyLevel;
}

type Phase = "Plan" | "Build" | "Run" | "Enable" | "Manage";

type CompetencyLevel = {
    [level: string]: string;
}
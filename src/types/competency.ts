export type Competencies = {
    [competency: string]: Competency
}

type Competency = {
    description: string;
    phase: Phase;
    levels: CompetencyLevel;
}

type Phase = "Plan" | "Build" | "Run" | "Enable" | "Manage";

type CompetencyLevel = {
    [level: number]: string;
}
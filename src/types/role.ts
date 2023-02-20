import { Deliverable } from "./deliverable";

export type Roles = {
    [role: string]: Role;
}

type Role = {
    summary: string;
    mission: string;
    deliverables: Deliverable;
    tasks: string[];
    competencies: RoleCompetency
}

type RoleCompetency = {
    [competency: string]: RoleCompetencyDescription
}

type RoleCompetencyDescription = {
    available: number[];
    level: number;
}
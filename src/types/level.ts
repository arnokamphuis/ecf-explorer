export type Levels = {
    [level: number]: Level;
}

export type Level = {
    developed: RoleDescription[];
    "in development": RoleDescription[]
}

type RoleDescription = {
    name: string;
    developed: string[];
    "in development": string[];
}


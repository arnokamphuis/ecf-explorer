export type Levels = {
	[level: string]: Level;
};

export type Level = {
	developed: LevelRoleDescription[];
	"in development": LevelRoleDescription[];
} & Record<string, LevelRoleDescription[]>;

export type LevelRoleDescription = {
	name: string;
	developed: string[];
	"in development": string[];
};

export interface Library {
	name: string;
	description: string;
	versions: Version[];
	frameworks: Framework[];
	state: State;
	socials: Social[];
	repository: string;
}

export interface Social {
	icon: string;
	label: string;
	url: string;
}

export interface Version {
	name: string;
	description?: string;
	state: State;
	isLatest?: boolean;
	branch: string;
}

export enum Framework {
	Angular = "angular",
	React = "react",
	Vue = "vue",
	Vanilla = "vanilla",
	Solid = "solid",
	Lit = "lit",
	Preact = "preact",
	Svelte = "svelte",
}

export enum State {
	Stable = "stable",
	Beta = "beta",
	Alpha = "alpha",
	Archived = "archived",
}

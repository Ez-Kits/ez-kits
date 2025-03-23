import { Framework, State, type Library } from "./types";

export const scrollbarConfig: Library = {
	name: "Ez Scrollbar",
	description: "A scrollbar component for Vue",
	repository: "ez-kits/scrollbar",
	versions: [
		{
			name: "latest",
			state: State.Stable,
			isLatest: true,
			branch: "main",
		},
		{
			name: "2.x",
			state: State.Stable,
			branch: "main",
		},
		{
			name: "1.x",
			state: State.Stable,
			branch: "1.x",
		},
	],
	frameworks: [Framework.React, Framework.Vue, Framework.Solid],
	state: State.Stable,
	socials: [
		{
			icon: "mdi-github",
			label: "GitHub",
			url: "https://github.com/ez-kits/scrollbar",
		},
	],
};

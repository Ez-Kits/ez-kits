import { DocStatus, Framework, State, type Library } from "./types";

export const hotKeysConfig: Library = {
	name: "Ez Hot Keys",
	description:
		"Ease of use yet powerful API for hot keys management. Supports Vue, React and Solid",
	repository: "ez-kits/hot-keys",
	docStatus: DocStatus.Done,
	versions: [
		{
			name: "latest",
			state: State.Alpha,
			isLatest: true,
			branch: "main",
		},
		{
			name: "0.x",
			state: State.Alpha,
			branch: "main",
		},
	],
	frameworks: [Framework.React, Framework.Vue, Framework.Solid],
	state: State.Alpha,
	socials: [
		{
			icon: "mdi-github",
			label: "GitHub",
			url: "https://github.com/ez-kits/hot-keys",
		},
	],
};

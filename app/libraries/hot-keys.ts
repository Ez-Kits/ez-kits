import { Framework, State, type Library } from "./types";

export const hotKeysConfig: Library = {
	name: "Hot Keys",
	description: "A library for handling hot keys",
	repository: "ez-kits/hot-keys",
	versions: [
		{
			name: "latest",
			state: State.Alpha,
			isLatest: true,
			branch: "main",
		},
		{
			name: "1.x",
			state: State.Alpha,
			branch: "1.x",
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

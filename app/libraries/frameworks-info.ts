import { Framework } from "./types";

export function getFrameworkName(framework: Framework) {
	return framework[0]?.toUpperCase() + framework.slice(1);
}

export function getFrameworkIcon(framework: Framework) {
	switch (framework) {
		case Framework.Solid:
			return "i-logos:solidjs-icon";
		case Framework.Angular:
			return "i-logos:angular-icon";
		case Framework.Lit:
			return "i-logos:lit-icon";
		case Framework.Svelte:
			return "i-logos:svelte-icon";
		case Framework.Vanilla:
			return "i-logos:javascript";
		default:
			return `i-logos:${framework}`;
	}
}

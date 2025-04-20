import type { NavigationMenuItem } from "@nuxt/ui";
import type { Social } from "~/libraries/types";

export interface HeaderData {
	logo?: string | URL;
	navigationItems?: NavigationMenuItem[];
	socials?: Social[];
}

export function useHeaderData() {
	return useState<HeaderData>("header-data");
}

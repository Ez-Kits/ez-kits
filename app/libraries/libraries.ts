import { hotKeysConfig } from "./hot-keys";
import { scrollbarConfig } from "./scrollbar";

export const libraries = {
	"hot-keys": hotKeysConfig,
	scrollbar: scrollbarConfig,
};

export type LibraryName = keyof typeof libraries;

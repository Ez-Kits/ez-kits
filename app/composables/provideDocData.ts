import type { Toc } from "@nuxtjs/mdc";
import type { LibraryName } from "~/libraries/libraries";
import type { Library } from "~/libraries/types";
import type { FrameworkConfig } from "~/schemas/framework-config";

export function provideDocData(data: {
	basicInfo: ComputedRef<
		| {
				frameworkConfig: FrameworkConfig;
				libraryConfig: Library;
				currentFramework: string;
				currentVersion: string;
				currentLibrary: LibraryName;
		  }
		| undefined
	>;
	toc: Ref<Toc | undefined>;
	content: Ref<string | undefined>;
}) {
	provide("DOC_DATA", data);
}

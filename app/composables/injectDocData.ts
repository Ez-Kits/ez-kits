import type { Toc } from "@nuxtjs/mdc";
import type { LibraryName } from "~/libraries/libraries";
import type { Framework, Library } from "~/libraries/types";
import type { FrameworkConfig } from "~/schemas/framework-config";

export function injectDocData() {
	const docData = inject<{
		basicInfo: ComputedRef<
			| {
					frameworkConfig: FrameworkConfig;
					libraryConfig: Library;
					currentFramework: Framework;
					currentVersion: string;
					currentLibrary: LibraryName;
			  }
			| undefined
		>;
		toc: Ref<Toc | undefined>;
		content: Ref<string | undefined>;
	}>("DOC_DATA");

	if (!docData) {
		throw new Error("DOC_DATA is not provided");
	}

	return docData;
}

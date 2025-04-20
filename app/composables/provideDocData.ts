import type { MDCParserResult } from "@nuxtjs/mdc";
import type { LibraryName } from "~/libraries/libraries";
import type { Library } from "~/libraries/types";
import type { FrameworkConfig } from "~/schemas/framework-config";

export function provideDocData(
	data: ComputedRef<
		| {
				rawContent: string;
				parsedContent: MDCParserResult;
				frameworkConfig: FrameworkConfig;
				libraryConfig: Library;
				currentFramework: string;
				currentVersion: string;
				currentLibrary: LibraryName;
		  }
		| undefined
	>
) {
	provide("DOC_DATA", data);
}

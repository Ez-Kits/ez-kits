<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import {
	getFrameworkConfig,
	getGithubDocsFileContent,
	getLibrary,
} from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
import type { Framework } from "~/libraries/types";
const route = useRoute("pkg-version-docs-framework-slug");
const { pkg, version, slug, framework } = route.params;
const library = getLibrary(pkg as LibraryName);

const { data } = await useAsyncData("doc", async () => {
	return Promise.all([
		getGithubDocsFileContent(
			pkg as LibraryName,
			version,
			`${framework}/${slug?.join("/")}.md`
		),
		getFrameworkConfig(pkg as LibraryName, framework as Framework, version),
	]).then((results) => {
		return {
			content: results[0],
			config: results[1],
		};
	});
});

const parseMarkdown = useParseMarkdown();
const parseResult = ref<MDCParserResult>();

if (data.value) {
	parseResult.value = await parseMarkdown(data.value.content);
}

watch(
	() => data.value?.content,
	async () => {
		if (!data.value) return;
		parseResult.value = await parseMarkdown(data.value.content);
	}
);

useHead({
	title: parseResult.value?.data.title,
	titleTemplate: (title) => `${title} - ${library.name}`,
	meta: [
		{
			name: "description",
			content: parseResult.value?.data.description,
		},
	],
});

provideDocData(
	computed(() => {
		if (!data.value || !parseResult.value) {
			return undefined;
		}

		return {
			rawContent: data.value.content,
			parsedContent: parseResult.value,
			frameworkConfig: data.value.config,
			libraryConfig: library,
			currentFramework: framework as Framework,
			currentVersion: version,
			currentLibrary: pkg as LibraryName,
		};
	})
);
</script>

<template>
	<Doc />
	<Footer>
		<template #left>
			<span
				class="text-sm text-(--ui-text-muted) block text-center md:text-left"
			>
				Published under the
				<a
					:href="`https://github.com/${library.repository}/blob/main/LICENSE`"
					class="underline"
				>
					MIT License
				</a>
			</span>
		</template>
	</Footer>
</template>

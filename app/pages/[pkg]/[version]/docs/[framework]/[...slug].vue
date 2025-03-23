<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import { getFrameworkConfig, getGithubDocsFileContent } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
import type { Framework } from "~/libraries/types";

const { pkg, version, slug, framework } = useRoute(
	"pkg-version-docs-framework-slug"
).params;

const { data } = await useAsyncData("doc", () => {
	return Promise.all([
		getGithubDocsFileContent(
			pkg as LibraryName,
			version,
			`${framework}/${slug}.md`
		),
		getFrameworkConfig(pkg as LibraryName, framework as Framework, version),
	]);
});

const parseResult = ref<MDCParserResult>();

if (data.value) {
	parseResult.value = await parseMarkdown(data.value[0]);
}

watchEffect(async () => {
	if (!data.value) return;
	parseResult.value = await parseMarkdown(data.value[0]);
});

useHead({
	title: parseResult.value?.data.title,
	meta: [
		{
			name: "description",
			content: parseResult.value?.data.description,
		},
	],
});
</script>

<template>
	<Doc
		v-if="parseResult && data"
		:content="parseResult.body"
		:data="parseResult.data"
		:sidebar-items="data[1].sidebar"
		:toc="parseResult.toc"
	/>
</template>

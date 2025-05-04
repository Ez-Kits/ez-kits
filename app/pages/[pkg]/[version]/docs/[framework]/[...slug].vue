<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import { getGithubDocsFileContent, getLibrary } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
const route = useRoute("pkg-version-docs-framework-slug");
const { pkg, version, slug, framework } = route.params;
const library = getLibrary(pkg as LibraryName);

const { data, status } = await useAsyncData("doc-content", async () => {
	return getGithubDocsFileContent(
		pkg as LibraryName,
		version,
		`${framework}/${slug?.join("/")}.md`
	);
});

if (status.value === "error") {
	setResponseStatus(404);
}

const parseMarkdown = useParseMarkdown();
const parseResult = ref<MDCParserResult>();

if (data.value) {
	parseResult.value = await parseMarkdown(data.value);
}

const docData = injectDocData();
watchEffect(() => {
	docData.content.value = data.value;
	docData.toc.value = parseResult.value?.toc;
});

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
definePageMeta({
	layout: "doc",
});
</script>

<template>
	<div
		v-if="status === 'error'"
		class="flex flex-col items-center justify-center h-full"
	>
		<h1 class="text-7xl font-bold">404</h1>
		<p class="text-3xl">Page Not Found</p>
	</div>
	<CustomMDCRenderer
		v-else-if="parseResult"
		:content="parseResult.body"
		:data="parseResult.data"
	/>
</template>

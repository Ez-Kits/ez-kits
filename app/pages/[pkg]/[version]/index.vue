<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import { getGithubDocsFileContent } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";

const { pkg, version } = useRoute("pkg-version").params;

const { data } = await useAsyncData("framework-config", () => {
	return getGithubDocsFileContent(pkg as LibraryName, version, `index.md`);
});

const markdownParseResult = ref<MDCParserResult>();

watchEffect(async () => {
	if (data.value) {
		markdownParseResult.value = await parseMarkdown(data.value);
	}
});
</script>

<template>
	<CustomMDCRenderer
		v-if="markdownParseResult"
		:content="markdownParseResult.body"
		:data="markdownParseResult.data"
	/>
</template>

<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import { getGithubDocsFileContent, getLibrary } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
const route = useRoute("pkg-version-docs-framework-slug");
const library = computed(() => getLibrary(route.params.pkg as LibraryName));

const { data, status } = await useAsyncData(
	"doc-content",
	async () => {
		return getGithubDocsFileContent(
			route.params.pkg as LibraryName,
			route.params.version,
			`${route.params.framework}/${route.params.slug?.join("/")}.md`
		);
	},
	{
		watch: [
			() => route.params.pkg,
			() => route.params.version,
			() => route.params.framework,
			() => route.params.slug,
		],
	}
);

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

const title = computed(
	() => `${parseResult.value?.data.title} - ${library.value.name}`
);
const description = computed(() => parseResult.value?.data.description);

definePageMeta({
	layout: "doc",
});

useHead({
	title,
	meta: [
		{
			name: "description",
			content: description,
		},
		{
			name: "icon",
			content: "https://ez-kits.org/favicon.ico",
		},
		{
			property: "lang",
			content: "en_US",
		},
	],
});
defineOgImageComponent("NuxtSeo", {
	title: computed(() => parseResult.value?.data.title),
	description,
	siteName: computed(() => library.value.name),
	colorMode: "dark",
});
useSeoMeta({
	ogTitle: title,
	description,
	ogDescription: description,
	twitterTitle: title,
	twitterDescription: description,
	ogUrl: computed(
		() =>
			`https://ez-kits.org/${route.params.pkg}/${route.params.version}/docs/${
				route.params.framework
			}/${route.params.slug?.join("/")}`
	),
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

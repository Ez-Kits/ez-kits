<script setup lang="ts">
import type { MDCParserResult } from "@nuxtjs/mdc";
import LightningBorderBox from "~/components/LightningBorderBox.vue";
import { getGithubDocsFileContent, getLibrary } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
import { DocStatus } from "~/libraries/types";
import { libraryFeaturesSchema } from "~/schemas/library-feature";

const route = useRoute("pkg-version");
const library = computed(() => getLibrary(route.params.pkg as LibraryName));

const { data } = await useAsyncData("library-index", () => {
	return getGithubDocsFileContent(
		route.params.pkg as LibraryName,
		route.params.version,
		`index.md`
	);
});

const markdownParseResult = ref<MDCParserResult>();
if (data.value) {
	markdownParseResult.value = await parseMarkdown(data.value);
}

const gettingStartedUrl = computed(() => {
	return `${route.path}/docs${markdownParseResult.value?.data["getting-started"]}`;
});

const features = markdownParseResult.value?.data.features
	? libraryFeaturesSchema.parse(markdownParseResult.value.data.features)
	: [];

const title = computed(() => library.value.name);
const description = computed(() => library.value.description);

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
	title,
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
		() => `https://ez-kits.org/${route.params.pkg}/${route.params.version}`
	),
});
</script>

<template>
	<div class="bg-radial from-(--ui-primary)/10 to-(--ui-bg) min-h-dvh">
		<UContainer
			class="flex flex-col items-center justify-center gap-4 py-10 min-h-dvh"
		>
			<img
				src="/logo.png"
				alt="Ez Kits Logo"
				class="w-30 h-auto select-none"
				draggable="false"
			/>
			<h1 class="text-9xl font-bold italic select-none text-center">
				{{ library.name }}
			</h1>
			<h2 class="text-3xl font-thin capitalize text-center">
				{{ library.description }}
			</h2>
			<UButton
				v-if="library.docStatus === DocStatus.Done"
				class="mt-10"
				variant="subtle"
				size="xl"
				trailing-icon="mdi-arrow-right"
				:href="gettingStartedUrl"
			>
				Getting Started
			</UButton>
			<span v-else class="mt-10 text-2xl"> Documentation is coming soon </span>
		</UContainer>

		<UContainer v-if="features.length > 0" class="py-10 flex flex-col gap-10">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<LightningBorderBox
					v-for="feature in features"
					:key="feature.title"
					class="before:rounded-[9px]"
				>
					<UCard
						class="ring-0 [&>div]:border-b-0 [&>div]:first:pb-0 [&>div]:last:pt-4 h-full"
					>
						<template #header>
							<h3 class="text-lg font-bold">
								{{ feature.title }}
							</h3>
						</template>
						<p class="first-letter:uppercase">{{ feature.description }}</p>
					</UCard>
				</LightningBorderBox>
			</div>
		</UContainer>
	</div>
	<Footer />
</template>

<script setup lang="ts">
import type { CommandPaletteItem } from "@nuxt/ui";
import { escape } from "html-escaper";
import { getLibraryBranch } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
import { searchDataSchema } from "~/schemas/search-data";

const isCommandPaletteOpen = ref(false);

function openCommandPalette() {
	isCommandPaletteOpen.value = true;
}

const isMac = useIsMac();
const modifier = isMac ? "meta" : "ctrl";

defineShortcuts({
	[isMac ? "command_k" : "ctrl_k"]: () => {
		openCommandPalette();
	},
});

// Handle search
const route = useRoute("pkg-version");
const { data: searchData } = await useAsyncData(
	"search-data",
	async () => {
		return fetch(
			`https://assets.ez-kits.org/docs-search-data-${getLibraryBranch(
				route.params.pkg as LibraryName,
				route.params.version as string
			)}.json`
		)
			.then((res) => res.json())
			.then(searchDataSchema.parse);
	},
	{
		watch: [() => route.params.pkg, () => route.params.version],
	}
);

const searchTerm = ref("");
const docData = injectDocData();
const items = computed(() => {
	if (!searchTerm.value) {
		return [];
	}

	return (searchData.value ?? [])
		.filter(
			(item) => item.framework === docData.basicInfo.value?.currentFramework
		)
		.map((item): CommandPaletteItem => {
			return {
				label: item.title + " > " + item.section.title.join(" > "),
				suffix: escape(item.section.content),
				onSelect: () => {
					if (!docData.basicInfo.value) {
						return;
					}
					isCommandPaletteOpen.value = false;
					navigateTo({
						name: "pkg-version-docs-framework-slug",
						params: {
							framework: item.framework,
							pkg: docData.basicInfo.value.currentLibrary,
							version: docData.basicInfo.value.currentVersion,
							slug: item.path.split("/"),
						},
						hash: `#${item.section.hash}`,
					});
				},
			};
		});
});

const groups = computed(() => {
	return [
		{
			id: "search",
			items: items.value,
		},
	];
});
</script>

<template>
	<UInput
		icon="i-lucide-search"
		size="xl"
		placeholder="Search"
		class="w-full"
		@focus="openCommandPalette"
	>
		<template #trailing>
			<span
				class="block space-x-0.5 h-5 -mt-2 **:!pointer-events-none !pointer-events-none"
			>
				<UKbd :value="modifier" />
				<UKbd value="K" />
			</span>
		</template>
	</UInput>
	<UModal v-model:open="isCommandPaletteOpen" class="max-w-3xl">
		<template #content>
			<UCommandPalette
				v-model:search-term="searchTerm"
				placeholder="Type to search..."
				:fuse="{ fuseOptions: { includeMatches: true } }"
				:groups="groups"
				@update:open="isCommandPaletteOpen = false"
			>
				<template #empty>
					<div class="text-center text-sm text-gray-500">
						<span v-if="searchTerm.length > 0">
							No results found for
							<span class="font-bold">{{ searchTerm }}</span>
						</span>
						<span v-else>Start typing to search</span>
					</div>
				</template>
			</UCommandPalette>
		</template>
	</UModal>
</template>

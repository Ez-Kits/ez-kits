<script setup lang="ts">
import { UCommandPalette } from "#components";

const isCommandPaletteOpen = ref(false);

function openCommandPalette() {
	isCommandPaletteOpen.value = true;
}

const isMac = useIsMac();
const modifier = isMac ? "meta" : "ctrl";

defineShortcuts({
	[isMac ? "meta_k" : "ctrl_k"]: () => {
		openCommandPalette();
	},
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
				placeholder="Type to search..."
				:fuse="{ fuseOptions: { includeMatches: true } }"
				:groups="[]"
				close
				@update:open="isCommandPaletteOpen = false"
			/>
		</template>
	</UModal>
</template>

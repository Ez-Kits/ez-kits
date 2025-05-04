<script setup lang="ts">
import { getLibraryBranch } from "~/libraries";

const props = defineProps<{
	src: string;
}>();

const docData = injectDocData();

const url = computed(() => {
	if (!docData.basicInfo.value) {
		return "";
	}

	const branch = getLibraryBranch(
		docData.basicInfo.value.currentLibrary,
		docData.basicInfo.value.currentVersion
	);

	return `https://codesandbox.io/p/devbox/github/${docData.basicInfo.value.libraryConfig.repository}/tree/${branch}/${props.src}?embed=1`;
});
</script>

<template>
	<div class="w-full aspect-video">
		<iframe :src="url" class="w-full h-full" />
	</div>
</template>

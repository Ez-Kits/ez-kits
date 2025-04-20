<script lang="ts" setup>
const props = defineProps<{
	content: string;
}>();
const isCopied = ref(false);

watch(isCopied, (value, _, onCleanup) => {
	if (value) {
		const timeout = setTimeout(() => {
			isCopied.value = false;
		}, 500);

		onCleanup(() => {
			clearTimeout(timeout);
		});
	}
});

function handleCopy() {
	navigator.clipboard.writeText(props.content);
	isCopied.value = true;
}
</script>

<template>
	<UButton color="neutral" variant="outline" @click="handleCopy()">
		<UIcon :name="isCopied ? 'ic-round-check' : 'ic-outline-content-copy'" />
	</UButton>
</template>

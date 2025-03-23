<script setup lang="ts">
import type { MDCRoot } from "@nuxtjs/mdc";

defineProps<{
	content: MDCRoot;
	data: Record<string, unknown>;
}>();
</script>

<template>
	<div>
		<MDCRenderer :body="content" :data="data" />
	</div>
</template>

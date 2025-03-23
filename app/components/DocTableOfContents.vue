<script setup lang="ts">
import type { Toc, TocLink } from "@nuxtjs/mdc";

const props = defineProps<{
	toc: Toc | TocLink[];
}>();

const links = computed(() => {
	if (Array.isArray(props.toc)) {
		return props.toc;
	}
	return props.toc.links;
});
</script>

<template>
	<div>
		<h2>Table of Contents</h2>
		<ul>
			<li v-for="item in links" :key="item.id">
				<a :href="`#${item.id}`">{{ item.text }}</a>
				<DocTableOfContents v-if="item.children" :toc="item.children" />
			</li>
		</ul>
	</div>
</template>

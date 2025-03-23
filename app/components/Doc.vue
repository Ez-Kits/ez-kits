<script setup lang="ts">
import type { MDCRoot, Toc } from "@nuxtjs/mdc";
import type { SidebarItem } from "~/schemas/framework-config";
import CustomMDCRenderer from "./CustomMDCRenderer.vue";

defineProps<{
	content: MDCRoot;
	sidebarItems: SidebarItem[];
	toc?: Toc;
	data: Record<string, unknown>;
}>();
</script>

<template>
	<div>
		<DocSidebar :items="sidebarItems" />
		<CustomMDCRenderer :content="content" :data="data" />
		<DocTableOfContents v-if="toc" :toc="toc" />
	</div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { SidebarItem } from "~/schemas/framework-config";

const props = defineProps<{
	items: SidebarItem[];
}>();

function transformSidebarItem(item: SidebarItem): NavigationMenuItem {
	return {
		label: item.title,
		href: item.slug,
		children: item.children?.map(transformSidebarItem),
	};
}

const items = computed((): NavigationMenuItem[] => {
	return props.items.map(transformSidebarItem);
});
</script>

<template>
	<UNavigationMenu :items="items" />
</template>

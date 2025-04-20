<script setup lang="ts">
import type { Toc, TocLink } from "@nuxtjs/mdc";
import { useWindowSize } from "@vueuse/core";

const props = defineProps<{
	toc: Toc | TocLink[];
	activeHeadings?: string[];
}>();

const links = computed(() => {
	if (Array.isArray(props.toc)) {
		return props.toc;
	}
	return props.toc.links;
});

const isChildren = computed(() => {
	return Array.isArray(props.toc);
});

// Table of Contents Collapse
const { width } = useWindowSize();
const isLargeScreen = computed(() => width.value >= 1024);
const isCollapsed = ref(true);

const mergedCollapsed = computed(() => {
	// if (typeof window === "undefined") return true;

	if (isLargeScreen.value) return false;
	return isCollapsed.value;
});
</script>

<template>
	<UCollapsible
		v-if="!isChildren"
		:class="[
			'bg-(--ui-bg)',
			'text-sm sticky top-[4.22rem] z-40 lg:top-0 lg:pt-4 lg:self-start',
			'border-y border-y-(--ui-border) py-2 lg:py-0 lg:border-none',
		]"
		:open="!mergedCollapsed"
	>
		<h4
			:class="[
				'text-sm font-semibold',
				'flex justify-between items-center lg:py-4',
			]"
			@click="isCollapsed = !isCollapsed"
		>
			On this page
			<UIcon
				name="i-lucide-chevron-down"
				:class="[
					'transition-transform duration-300 lg:!hidden',
					{
						'rotate-180': !isCollapsed,
					},
				]"
			/>
		</h4>
		<template #content>
			<ul class="mt-4 lg:mt-0">
				<li v-for="item in links" :key="item.id">
					<a
						:href="`#${item.id}`"
						:class="{
							'text-primary-600 font-medium': activeHeadings?.includes(item.id),
						}"
						>{{ item.text }}</a
					>
					<DocTableOfContents
						v-if="item.children"
						:toc="item.children"
						:active-headings="activeHeadings"
					/>
				</li>
			</ul>
		</template>
	</UCollapsible>
	<ul v-else class="pl-4">
		<li v-for="item in links" :key="item.id">
			<a
				:href="`#${item.id}`"
				:class="{
					'text-primary-600 font-medium': activeHeadings?.includes(item.id),
				}"
				>{{ item.text }}</a
			>
			<DocTableOfContents
				v-if="item.children"
				:toc="item.children"
				:active-headings="activeHeadings"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import CustomMDCRenderer from "./CustomMDCRenderer.vue";

const docData = injectDocData();

// Markdown Data
const content = computed(() => docData.value?.parsedContent.body);
const data = computed(() => docData.value?.parsedContent.data);
const toc = computed(() => docData.value?.parsedContent.toc);

// Active Headings
const activeHeadings = ref<string[]>([]);
const observer = ref<IntersectionObserver | null>(null);

const setupIntersectionObserver = () => {
	if (typeof window === "undefined") return;

	// Cleanup existing observer
	if (observer.value) {
		observer.value.disconnect();
		observer.value = null;
	}

	const hash = window.location.hash.slice(1);
	if (hash) {
		activeHeadings.value = [hash];
	} else {
		const headings = document.querySelectorAll(
			"h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"
		);
		for (const heading of headings) {
			const rect = heading.getBoundingClientRect();
			if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
				activeHeadings.value = [heading.id];
				break;
			}
		}
	}

	const newObserver = new IntersectionObserver(
		(entries) => {
			const observedElements = new Map<string, IntersectionObserverEntry>();

			entries.forEach((entry) => {
				observedElements.set(entry.target.id, entry);
			});

			const visibleHeadings = Array.from(observedElements.values()).filter(
				(entry) => entry.isIntersecting
			);
			if (visibleHeadings.length > 0) {
				activeHeadings.value = visibleHeadings.map(
					(heading) => heading.target.id
				);
			}
		},
		{
			rootMargin: "0px",
			threshold: 0.2,
		}
	);

	setTimeout(() => {
		const headings = Array.from(
			document.querySelectorAll(
				"h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"
			)
		);

		if (headings.length > 0) {
			headings.forEach((heading) => newObserver.observe(heading));
			observer.value = newObserver;
		}
	}, 100);
};

// Watch content changes
watch(
	() => docData.value?.parsedContent,
	() => {
		nextTick(() => {
			setupIntersectionObserver();
		});
	},
	{ immediate: true }
);

onUnmounted(() => {
	if (observer.value) {
		observer.value.disconnect();
		observer.value = null;
	}
});
</script>

<template>
	<div
		class="grid grid-cols-1 lg:grid-cols-[12rem_1fr_12rem] xl:grid-cols-[16rem_1fr_16rem] gap-x-6 px-6"
	>
		<DocSidebar />
		<div class="text-base overflow-hidden pt-4 order-3 lg:order-2">
			<CustomMDCRenderer
				v-if="content && data"
				:content="content"
				:data="data"
			/>
		</div>
		<DocTableOfContents
			v-if="toc?.links.length"
			:toc="toc"
			:active-headings="activeHeadings"
			class="order-1 lg:order-3"
		/>
	</div>
</template>

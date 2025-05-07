<script setup lang="ts">
import type { Toc } from "@nuxtjs/mdc";
import { getFrameworkConfig, getLibrary, getLibraryBranch } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";
import type { Framework } from "~/libraries/types";

const route = useRoute("pkg-version-docs-framework-slug");
const library = computed(() => getLibrary(route.params.pkg as LibraryName));

const { data } = await useAsyncData(
	"framework-config",
	async () => {
		return getFrameworkConfig(
			route.params.pkg as LibraryName,
			route.params.framework as Framework,
			route.params.version
		);
	},
	{
		watch: [
			() => route.params.framework,
			() => route.params.pkg,
			() => route.params.version,
		],
	}
);

const toc = ref<Toc>();
const content = ref<string>();

provideDocData({
	toc,
	content,
	basicInfo: computed(() => {
		if (!data.value) {
			return undefined;
		}

		return {
			frameworkConfig: data.value,
			libraryConfig: library.value,
			currentFramework: route.params.framework as Framework,
			currentVersion: route.params.version,
			currentLibrary: route.params.pkg as LibraryName,
		};
	}),
});

// Active Headings
const activeHeadings = ref<string[]>([]);
const observer = ref<IntersectionObserver | null>(null);
const contentRef = useTemplateRef<HTMLDivElement>("content");

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

	const observedElements = new Map<string, IntersectionObserverEntry>();
	const newObserver = new IntersectionObserver(
		(entries) => {
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
onMounted(() => {
	setupIntersectionObserver();
});

useMutationObserver(contentRef, () => {
	setupIntersectionObserver();
});

onUnmounted(() => {
	if (observer.value) {
		observer.value.disconnect();
		observer.value = null;
	}
});
</script>

<template>
	<div class="flex flex-col min-h-dvh">
		<div
			class="flex-1 grid grid-cols-1 lg:grid-cols-[12rem_1fr_12rem] xl:grid-cols-[16rem_1fr_16rem] gap-x-6 px-6"
		>
			<DocSidebar />
			<div
				ref="content"
				:class="[
					'text-base overflow-hidden pt-4 order-3 lg:order-2 pb-10',
					{
						'lg:col-span-2': !toc?.links.length,
					},
				]"
			>
				<slot />
			</div>
			<DocTableOfContents
				v-if="toc?.links.length"
				:toc="toc"
				:active-headings="activeHeadings"
				class="order-1 lg:order-3"
			/>
		</div>
		<Footer>
			<template #left>
				<span
					class="text-sm text-(--ui-text-muted) block text-center md:text-left"
				>
					Published under the
					<a
						:href="`https://github.com/${library.repository}/blob/${getLibraryBranch(route.params.pkg as LibraryName, route.params.version)}/LICENSE`"
						class="underline"
					>
						MIT License
					</a>
				</span>
			</template>
		</Footer>
	</div>
</template>

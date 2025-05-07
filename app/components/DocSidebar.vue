<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";
import { useWindowSize } from "@vueuse/core";
import { getLibraryLatestVersionIndexUrl } from "~/libraries";
import {
	getFrameworkIcon,
	getFrameworkName,
} from "~/libraries/frameworks-info";
import type { LibraryName } from "~/libraries/libraries";

const docData = injectDocData();

const libraryLatestVersionIndexUrl = computed(() =>
	docData.basicInfo.value?.currentLibrary
		? getLibraryLatestVersionIndexUrl(
				docData.basicInfo.value?.currentLibrary as LibraryName
		  )
		: undefined
);

// Frameworks
const route = useRoute("pkg-version-docs-framework-slug");
const currentFramework = computed({
	get: () => docData.basicInfo.value?.currentFramework,
	set: (value) => {
		if (!value) return;

		navigateTo({
			name: "pkg-version-docs-framework-slug",
			params: {
				framework: value,
				pkg: route.params.pkg,
				version: route.params.version,
				slug: route.params.slug,
			},
		});
	},
});
const currentFrameworkIcon = computed(() =>
	currentFramework.value ? getFrameworkIcon(currentFramework.value) : ""
);

const frameworkOptions = computed((): SelectItem[] => {
	return (
		docData.basicInfo.value?.libraryConfig.frameworks.map((framework) => {
			return {
				label: getFrameworkName(framework),
				value: framework,
				icon: getFrameworkIcon(framework),
			};
		}) ?? []
	);
});

// Version
const versionOptions = computed(
	(): SelectItem[] =>
		docData.basicInfo.value?.libraryConfig.versions.map((version) => {
			return {
				label: version.name,
				value: version.name,
			};
		}) ?? []
);

const currentVersion = computed({
	get: () => docData.basicInfo.value?.currentVersion,
	set: (value) => {
		if (!value) return;
		navigateTo({
			name: "pkg-version-docs-framework-slug",
			params: {
				version: value,
				pkg: route.params.pkg,
				framework: route.params.framework,
				slug: route.params.slug,
			},
		});
	},
});

// Sidebar Items
const sidebarItems = computed(
	() => docData.basicInfo.value?.frameworkConfig.sidebar ?? []
);

const { navigationItems, activeTabIndex, tabsItems } =
	useDocSidebar(sidebarItems);

// Sidebar Collapse
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
		:class="[
			'bg-(--ui-bg)',
			'flex flex-col',
			'z-50 fixed w-full left-0 top-0 self-start px-6',
			'lg:px-0 lg:left-auto lg:sticky',
			'pt-1 lg:pt-4',
			'max-h-dvh overflow-hidden',
			{
				'h-dvh lg:h-auto': !mergedCollapsed,
			},
		]"
		:open="!mergedCollapsed"
		:unmount-on-hide="false"
	>
		<div class="flex gap-4 justify-between items-center">
			<a
				v-if="libraryLatestVersionIndexUrl"
				:href="libraryLatestVersionIndexUrl"
				class="flex gap-x-2 items-center"
			>
				<img
					src="/logo.png"
					class="w-8 h-auto object-contain"
					draggable="false"
				/>
				<span class="text-3xl font-black italic select-none">
					{{ docData.basicInfo.value?.libraryConfig.name }}
				</span>
			</a>
			<UButton
				icon="i-lucide-menu"
				variant="soft"
				class="lg:hidden"
				@click="isCollapsed = !isCollapsed"
			/>
		</div>
		<template #content>
			<div
				class="flex flex-col gap-y-4 overflow-hidden max-h-[calc(100dvh-4rem-1.15rem)] lg:max-h-[calc(100dvh-4rem-2rem)] mt-4"
			>
				<ClientOnly>
					<DocSearch />
					<div class="flex gap-x-2">
						<USelect
							:model-value="currentFramework as undefined"
							:icon="currentFrameworkIcon"
							:items="frameworkOptions"
							class="flex-2/3"
							@update:model-value="currentFramework = $event"
						/>
						<USelect
							:model-value="currentVersion as undefined"
							:items="versionOptions"
							class="flex-1/3"
							@update:model-value="currentVersion = $event"
						/>
					</div>
				</ClientOnly>

				<div class="flex-1 overflow-auto">
					<UTabs
						v-if="activeTabIndex"
						v-model="activeTabIndex"
						:items="tabsItems"
						class="sticky top-0 mb-2 z-10"
						color="neutral"
						size="xs"
					>
						<template #content>
							<UNavigationMenu
								:items="navigationItems"
								orientation="vertical"
								highlight-color="primary"
								highlight
								:ui="{
									linkLeadingIcon: 'text-xl',
								}"
							/>
						</template>
					</UTabs>
				</div>
			</div>
		</template>
	</UCollapsible>
</template>

import type { NavigationMenuItem, TabsItem } from "@nuxt/ui";
import type { SidebarItem, SidebarTab } from "~/schemas/framework-config";

export default function useDocSidebar(sidebarTabs: MaybeRef<SidebarTab[]>) {
	const route = useRoute("pkg-version-docs-framework-slug");
	const stringSlug = computed(
		() => `${route.params.framework}/${route.params.slug?.join("/")}`
	);

	function normalizeSlug(slug: string): string {
		return slug
			.replace(new RegExp(`^/?${route.params.framework}/`), "")
			.replace(/^\//, "");
	}

	function hasActiveItem(items: SidebarItem[]): boolean {
		for (let index = 0; index < items.length; index++) {
			const item = items[index];
			if (!item) {
				continue;
			}

			if (
				item.slug &&
				normalizeSlug(item.slug) === normalizeSlug(stringSlug.value)
			) {
				return true;
			}

			if (item.children) {
				return hasActiveItem(item.children);
			}
		}

		return false;
	}

	function isActiveItem(item: SidebarItem): boolean {
		if (
			!!item.slug &&
			normalizeSlug(item.slug) === normalizeSlug(stringSlug.value)
		) {
			return true;
		}

		if (item.children) {
			return hasActiveItem(item.children);
		}

		return false;
	}

	function transformSidebarItem(item: SidebarItem): NavigationMenuItem {
		const href = item.children
			? undefined
			: `/${route.params.pkg}/${route.params.version}/docs/${
					route.params.framework
			  }/${normalizeSlug(item.slug ?? "")}`;

		const active = isActiveItem(item);

		return {
			label: item.text,
			icon: item.icon,
			value: href,
			to: href,
			children: item.children?.map(transformSidebarItem),
			defaultOpen: true,
			class: item.children ? "!text-sm font-semibold" : undefined,
			active,
		};
	}

	const computedSidebarTabs = computed(() =>
		toValue(sidebarTabs).map((tab) => {
			return {
				...tab,
				children: tab.children.map(transformSidebarItem),
			};
		})
	);

	const tabsItems = computed((): TabsItem[] =>
		toValue(sidebarTabs).map((tab) => {
			return {
				label: tab.label,
				icon: tab.icon,
				value: tab.label,
			};
		})
	);

	function getActiveTab() {
		return toValue(sidebarTabs).find((tab) =>
			tab.children.some((child) => {
				if (child.children) {
					return hasActiveItem(child.children);
				}

				return isActiveItem(child);
			})
		)?.label;
	}

	const activeTabIndex = ref<string | undefined>(getActiveTab());

	watchEffect(() => {
		if (typeof window !== "undefined") {
			activeTabIndex.value = getActiveTab();
		}
	});

	const navigationItems = computed(
		() =>
			toValue(computedSidebarTabs).find(
				(tab) => tab.label === activeTabIndex.value
			)?.children ?? []
	);

	return {
		navigationItems,
		activeTabIndex,
		tabsItems,
	};
}

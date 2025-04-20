import type { NavigationMenuItem, TabsItem } from "@nuxt/ui";
import type { SidebarItem, SidebarTab } from "~/schemas/framework-config";

export default function useDocSidebar(sidebarTabs: MaybeRef<SidebarTab[]>) {
	const route = useRoute("pkg-version-docs-framework-slug");
	const { pkg, version, slug, framework } = route.params;
	const stringSlug = computed(() => `${framework}/${slug?.join("/")}`);

	function normalizeSlug(slug: string): string {
		return slug.replace(new RegExp(`^/?${framework}/`), "").replace(/^\//, "");
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
			: `/${pkg}/${version}/docs/${framework}/${normalizeSlug(
					item.slug ?? ""
			  )}`;

		const defaultOpen = item.children ? hasActiveItem(item.children) : false;
		const active = isActiveItem(item);

		return {
			label: item.text,
			icon: item.icon,
			value: href,
			to: href,
			children: item.children?.map(transformSidebarItem),
			defaultOpen,
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

	const activeTabIndex = ref(0);

	watchEffect(() => {
		activeTabIndex.value = toValue(sidebarTabs).findIndex((tab) =>
			tab.children.some((child) => {
				if (child.children) {
					return hasActiveItem(child.children);
				}

				return isActiveItem(child);
			})
		);
	});

	const navigationItems = computed(
		() =>
			toValue(computedSidebarTabs).find(
				(tab, index) => index === activeTabIndex.value
			)?.children ?? []
	);

	return {
		navigationItems,
		activeTabIndex,
		tabsItems,
	};
}

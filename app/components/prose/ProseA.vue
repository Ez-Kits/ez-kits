<script setup lang="ts">
import type { PropType } from "vue";
import type { LibraryName } from "~/libraries/libraries";

const props = defineProps({
	href: {
		type: String,
		default: "",
	},
	target: {
		type: String as PropType<
			| "_blank"
			| "_parent"
			| "_self"
			| "_top"
			| (string & object)
			| null
			| undefined
		>,
		default: undefined,
		required: false,
	},
});

const route = useRoute();

const computedHref = computed(() => {
	if (props.href.startsWith("http")) {
		return props.href;
	}

	if (route.name === "pkg-version-docs-framework-slug") {
		const pkg = route.params.pkg as LibraryName;
		const version = route.params.version as string;
		const slug = props.href.replace(/^\//, "");
		return `/${pkg}/${version}/docs/${slug}`;
	}

	return props.href;
});
</script>

<template>
	<NuxtLink :href="computedHref" :target="props.target" class="underline">
		<slot />
	</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
	() =>
		props.id &&
		((typeof headings?.anchorLinks === "boolean" &&
			headings?.anchorLinks === true) ||
			(typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h1))
);
</script>

<template>
	<h4 :id="props.id" class="text-xl font-bold mb-4 mt-10">
		<a v-if="generate" :href="`#${props.id}`">
			<slot />
		</a>
		<slot v-else />
	</h4>
</template>

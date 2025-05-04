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
	<h2 :id="props.id" class="**:text-3xl font-bold mb-4 mt-14">
		<a v-if="generate" :href="`#${props.id}`">
			<slot />
		</a>
		<slot v-else />
	</h2>
</template>

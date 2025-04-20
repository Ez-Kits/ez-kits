<script setup lang="ts">
const props = defineProps({
	code: {
		type: String,
		default: "",
	},
	language: {
		type: String,
		default: null,
	},
	filename: {
		type: String,
		default: null,
	},
	highlights: {
		type: Array as () => number[],
		default: () => [],
	},
	meta: {
		type: String,
		default: null,
	},
	class: {
		type: String,
		default: null,
	},
});
</script>

<template>
	<div
		:class="[
			'syntax-highlight my-4',
			'rounded border border-(--ui-border-muted) p-4',
			'bg-(--ui-bg-muted)',
			'text-sm overflow-auto',
		]"
	>
		<div class="flex items-center justify-between gap-2 mb-2 sticky left-0">
			<div class="inline-flex items-center gap-2">
				<UBadge v-if="language" color="neutral" variant="outline">{{
					language
				}}</UBadge>
				<span class="text-xs text-muted-foreground">{{ filename }}</span>
			</div>
			<CopyButton :content="props.code" />
		</div>
		<pre :class="$props.class"><slot /></pre>
	</div>
</template>

<style>
pre code .line {
	display: block;
}
</style>

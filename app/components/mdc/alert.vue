<script setup lang="ts">
import type { AlertProps } from "@nuxt/ui";

withDefaults(defineProps<AlertProps>(), {
	variant: "subtle",
});
</script>

<template>
	<UAlert
		class="my-4 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0"
		:color="color"
		:variant="variant"
	>
		<template #description>
			<slot />
		</template>
	</UAlert>
</template>

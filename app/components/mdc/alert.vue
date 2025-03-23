<script setup lang="ts">
defineProps<{
	type: "info" | "warning" | "error";
}>();
</script>

<template>
	<div class="mdc-alert mdc-alert--{{ props.type }}">
		<div class="mdc-alert__icon">
			<UIcon name="mdi-info" />
		</div>
		<div class="mdc-alert__content">
			<slot />
		</div>
	</div>
</template>

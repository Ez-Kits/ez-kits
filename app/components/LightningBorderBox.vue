<script setup lang="ts"></script>

<template>
	<div class="lightning-border-box">
		<slot />
	</div>
</template>

<style scoped>
@reference "tailwindcss";

.lightning-border-box {
	@apply relative p-px;
}

@property --angle {
	syntax: "<angle>";
	initial-value: 0deg;
	inherits: false;
}

.lightning-border-box::before,
.lightning-border-box::after {
	@apply content-[''] absolute inset-0 z-[-1];
	background: conic-gradient(
			from var(--angle),
			transparent,
			var(--color-yellow-500) 100%
		),
		var(--ui-border-muted);
	animation: rotate 5s linear infinite;
}

.lightning-border-box::after {
	@apply blur-xs;
}

@keyframes rotate {
	0% {
		--angle: 0deg;
	}
	100% {
		--angle: 360deg;
	}
}
</style>

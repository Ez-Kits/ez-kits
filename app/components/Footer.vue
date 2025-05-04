<script setup lang="ts"></script>

<template>
	<footer
		class="border-t border-t-(--ui-border-muted) py-4 px-6 flex flex-wrap justify-between"
	>
		<div class="w-full md:flex-1/4 order-2 md:order-1">
			<slot name="left" />
		</div>
		<p
			class="text-center text-sm text-muted-foreground w-full md:flex-2/4 order-1 md:order-2"
		>
			Made with ❤️ by
			<a href="https://github.com/ez-kits" class="underline">Ez Kits</a>
		</p>
		<div class="w-full md:flex-1/4 order-3">
			<slot name="right" />
		</div>
	</footer>
</template>

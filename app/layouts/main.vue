<script setup lang="ts">
const headerData = useHeaderData();
</script>

<template>
	<header class="bg-(--ui-bg)">
		<UContainer class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<NuxtLink to="/">
					<UIcon name="material-symbols-light-home-outline" />
				</NuxtLink>
				<NuxtLink to="/">Ez Kits</NuxtLink>
			</div>

			<UNavigationMenu
				v-if="headerData.navigationItems"
				:items="headerData.navigationItems"
			/>
		</UContainer>
	</header>
	<slot />
</template>

<script setup lang="ts">
import { UButton } from "#components";
import { getLibraryLatestVersionIndexUrl } from "~/libraries";
import { libraries } from "~/libraries/libraries";

useSeoMeta({
	title: "Ez Kits",
	ogImage: "/logo.png",
	ogDescription:
		"Ez Kits is a collection of libraries that try to make it easier to build beautiful, responsive, and accessible web applications.",
	description:
		"Ez Kits is a collection of libraries that try to make it easier to build beautiful, responsive, and accessible web applications.",
});
</script>
<template>
	<div class="bg-radial from-(--ui-primary)/10 to-(--ui-bg) min-h-dvh">
		<UContainer
			class="flex flex-col items-center justify-center gap-4 py-10 min-h-dvh"
		>
			<img
				src="/logo.png"
				alt="Ez Kits Logo"
				class="w-30 h-auto select-none"
				draggable="false"
			/>
			<h1 class="text-9xl font-bold italic select-none text-center">Ez Kits</h1>
			<h2 class="text-3xl font-thin capitalize text-center">
				Ease of use libraries for developers
			</h2>
			<section class="mt-10">
				<blockquote class="text-center text-xl italic w-xl max-w-full mx-auto">
					"Ez Kits tries to make it easier to build beautiful, responsive, and
					accessible web applications."
				</blockquote>
				<p class="text-center text-sm italic w-sm max-w-full mx-auto">
					- Niku, Developer at Ez Kits
				</p>
			</section>
			<UButton
				class="mt-10"
				variant="subtle"
				href="/#libraries"
				size="xl"
				trailing-icon="material-symbols-light-keyboard-double-arrow-down-rounded"
			>
				Explore Libraries
			</UButton>
		</UContainer>

		<UContainer class="py-10 flex flex-col gap-10">
			<section id="libraries">
				<h2 class="text-4xl font-bold capitalize mb-5">Libraries</h2>
				<div
					class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 place-content-center"
				>
					<div
						v-for="(library, libraryName) in libraries"
						:key="libraryName"
						class="rounded-lg p-px bg-gradient-to-b from-(--ui-primary) to-(--ui-primary)/30"
					>
						<UCard class="ring-0 [&>div]:border-b-0 [&>div]:first:pb-0">
							<template #header>
								<h3
									class="text-lg font-bold cursor-pointer hover:underline"
									@click="
										navigateTo(getLibraryLatestVersionIndexUrl(libraryName))
									"
								>
									{{ library.name }}
								</h3>
							</template>
							<p>{{ library.description }}</p>
						</UCard>
					</div>
				</div>
			</section>
		</UContainer>
	</div>
	<Footer />
</template>

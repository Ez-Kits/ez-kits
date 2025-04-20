// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image",
		"@nuxt/icon",
		"@nuxt/fonts",
		"@nuxt/eslint",
		"@nuxt/ui",
		"@nuxtjs/mdc",
	],
	css: ["~/assets/css/main.css"],
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4,
	},
	experimental: {
		typedPages: true,
	},
	components: {
		global: true,
		dirs: ["~/components/prose", "~/components/mdc", "~/components"],
	},
	mdc: {
		headings: {
			anchorLinks: true,
		},
	},
	typescript: {
		tsConfig: {
			include: ["orama.d.ts"],
		},
	},
});

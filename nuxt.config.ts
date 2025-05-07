// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image",
		"@nuxt/icon",
		"@nuxt/fonts",
		"@nuxt/eslint",
		"@nuxt/ui",
		"@nuxtjs/mdc",
		"nuxt-og-image",
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
	routeRules: {
		"/**/docs/**": {
			isr: 3600,
		},
	},
	site: {
		url: "https://ez-kits.org",
		name: "Ez Kits",
	},
	app: {
		head: {
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
});

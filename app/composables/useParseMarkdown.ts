import {
	createMarkdownParser,
	createShikiHighlighter,
	rehypeHighlight,
} from "@nuxtjs/mdc/runtime";
// Import desired Shiki themes and languages
import BashLang from "shiki/langs/bash.mjs";
import HtmlLang from "shiki/langs/html.mjs";
import MdcLang from "shiki/langs/mdc.mjs";
import ScssLang from "shiki/langs/scss.mjs";
import TsxLang from "shiki/langs/tsx.mjs";
import TsLang from "shiki/langs/typescript.mjs";
import VueLang from "shiki/langs/vue.mjs";
import YamlLang from "shiki/langs/yaml.mjs";
import GithubDark from "shiki/themes/github-dark.mjs";
import GithubLight from "shiki/themes/github-light.mjs";

export default function useParseMarkdown() {
	let parser: Awaited<ReturnType<typeof createMarkdownParser>>;

	const parse = async (markdown: string) => {
		if (!parser) {
			parser = await createMarkdownParser({
				rehype: {
					plugins: {
						highlight: {
							instance: rehypeHighlight,
							options: {
								theme: {
									dark: "github-dark",
									light: "github-light",
								},
								highlighter: createShikiHighlighter({
									bundledThemes: {
										"github-dark": GithubDark,
										"github-light": GithubLight,
									},
									bundledLangs: {
										html: HtmlLang,
										mdc: MdcLang,
										vue: VueLang,
										yml: YamlLang,
										scss: ScssLang,
										ts: TsLang,
										typescript: TsLang,
										tsx: TsxLang,
										typescriptreact: TsxLang,
										bash: BashLang,
									},
								}),
							},
						},
					},
				},
			});
		}
		return parser(markdown);
	};

	return parse;
}

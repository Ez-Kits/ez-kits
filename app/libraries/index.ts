import { frameworkConfigSchema } from "~/schemas/framework-config";
import type { LibraryName } from "./libraries";
import { libraries } from "./libraries";
import type { Framework } from "./types";

export function getLibrary(name: LibraryName) {
	return libraries[name];
}

export function getLibraryRepository(name: LibraryName) {
	return getLibrary(name).repository;
}

export function getLibraryBranch(name: LibraryName, version: string) {
	const library = getLibrary(name);
	const branch = library.versions.find((v) => v.name === version)?.branch;
	if (!branch) {
		throw new Error(
			`Branch not found for library ${name} and version ${version}`
		);
	}

	return branch;
}

export function getLibraryLatestVersionIndexUrl(name: LibraryName) {
	const library = getLibrary(name);
	const latestVersion =
		library.versions.find((v) => v.isLatest) ?? library.versions[0];
	if (!latestVersion) {
		throw new Error(`Latest version not found for library ${name}`);
	}

	return `${name}/${latestVersion.name}`;
}

export function getGithubDocsFileUrl(
	name: LibraryName,
	version: string,
	path: string
) {
	const repository = getLibraryRepository(name);
	const url = new URL(
		`${repository}/${getLibraryBranch(name, version)}/docs/${path}`,
		"https://raw.githubusercontent.com/"
	);
	return url.toString();
}

export async function getGithubDocsFileContent(
	name: LibraryName,
	version: string,
	path: string
) {
	const url = getGithubDocsFileUrl(name, version, path);
	const response = await fetch(url);
	if (!response.ok) {
		console.error(response);
		throw new Error(`Failed to fetch ${url}`);
	}
	const content = await response.text();
	return content;
}

export async function getFrameworkConfig(
	name: LibraryName,
	framework: Framework,
	version: string
) {
	const content = await getGithubDocsFileContent(
		name,
		version,
		`${framework}/config.json`
	);
	const config = frameworkConfigSchema.parse(JSON.parse(content));
	return config;
}

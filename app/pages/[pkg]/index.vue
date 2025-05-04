<script setup lang="ts">
import { getLibraryLatestVersionIndexUrl } from "~/libraries";
import type { LibraryName } from "~/libraries/libraries";

const route = useRoute("pkg");
const pkg = route.params.pkg;

await navigateTo(getLibraryLatestVersionIndexUrl(pkg as LibraryName));
</script>

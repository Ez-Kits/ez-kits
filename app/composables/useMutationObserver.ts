export default function useMutationObserver(
	element: MaybeRef<Element | null>,
	callback: (mutations: MutationRecord[]) => void,
	options: MutationObserverInit = {
		childList: true,
		subtree: true,
	}
) {
	if (typeof window === "undefined") return;

	watchEffect((onCleanup) => {
		const observer = new MutationObserver(callback);
		const el = toValue(element);
		if (el) {
			observer.observe(el, options);
			onCleanup(() => {
				observer.disconnect();
			});
		}
	});
}

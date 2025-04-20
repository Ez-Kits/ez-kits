import DeviceDetector from "device-detector-js";

export default function useIsMac() {
	if (typeof window === "undefined") {
		return false;
	}

	const deviceDetector = new DeviceDetector();
	const result = deviceDetector.parse(navigator.userAgent);

	return !!result.os?.name && result.os.name.toLowerCase().includes("mac");
}

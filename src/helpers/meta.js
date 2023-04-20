import platform from "platform";
import DeviceDetector from "device-detector-js";

export const meta = (query) => {
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(navigator.userAgent);
  const { ua, name, version, os } = platform;
  return {
    ua,
    browser_name: name,
    browser_version: version,
    engine_name: device.client.engine,
    engine_version: device.client.engineVersion,
    os_name: navigator?.userAgentData?.platform || "",
    os_version: os.version,
    device_model: device.device.model,
    device_type: device.device.type,
    device_vendor: device.device.brand,
    cpu_architecture: os.architecture,
    utm_source: query.utm_source,
    utm_medium: query.utm_medium,
    utm_campaign: query.utm_campaign,
    utm_content: query.utm_content,
  };
};

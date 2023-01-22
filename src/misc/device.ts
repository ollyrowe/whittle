import UAParser from "ua-parser-js";

const parser = new UAParser();

const device = parser.getDevice();

export const isMobile = device.type === "mobile";

export const isTablet = device.type === "tablet";

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

export function getContrastTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);

  if (!rgb) {
    return "text-white";
  }

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  const whiteContrastRatio = 1.05 / (luminance + 0.05);
  const darkContrastRatio = (luminance + 0.05) / 0.05;

  return darkContrastRatio > whiteContrastRatio
    ? "text-gray-900"
    : "text-white";
}

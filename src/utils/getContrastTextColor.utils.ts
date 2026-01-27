/**
 * Calculates the relative luminance of a color
 * Based on WCAG 2.0 formula
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Handle 3-digit hex
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

/**
 * Determines whether to use light or dark text based on background color
 * @param backgroundColor - Hex color string (e.g., "#ffffff" or "ffffff")
 * @param threshold - Luminance threshold (0-1), default 0.5
 * @returns "text-white" for dark backgrounds, "text-gray-900" for light backgrounds
 */
export function getContrastTextColor(
  backgroundColor: string,
  threshold: number = 0.5
): string {
  const rgb = hexToRgb(backgroundColor);

  if (!rgb) {
    // Fallback to white if color parsing fails
    return "text-white";
  }

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

  // If luminance is greater than threshold, background is light, use dark text
  return luminance > threshold ? "text-gray-900" : "text-white";
}

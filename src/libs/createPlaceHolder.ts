import type { ImageMetadata } from "astro"
import { getImage } from "astro:assets"

export const createPlaceHolder = async (src:ImageMetadata) => await getImage({ src, width: 12,  format:'png', })
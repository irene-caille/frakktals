import { mkdir, writeFile } from "node:fs/promises";
/**
 * @param {string} url
 * @param {string} filepath
 */
const downloadImg = async (url, filepath) => {
	const response = await fetch(url);
	const blob = await response.blob();
	const buffer = Buffer.from(await blob.arrayBuffer());
	await writeFile(filepath, buffer);
};

/**
 * @param {string} slug
 */
const thumbnailFilePath = (slug) => `src/content/assets/articles/${slug}/thumbnail/thumbnail.webp`;

/**
 * @param {string} slug
 * @param {number} index
 */
const referenceFilePath = (slug, index) =>
	`src/content/assets/articles/${slug}/references/${index}/${index}.webp`;

const referencesFrontMatter = (data) => {
	if (!data.references || data.references.length === 0) return "";
	const result = data.references.reduce((acc, curr, i) => {
		return (
			acc +
			`
  - image: >-
      ${referenceFilePath(data.slug, i)}
    title: ${curr.title ?? '""'}
    author: ${curr.author ?? '""'}
    other: ${curr.other ?? '""'}
    alt: ${curr.alt ?? '""'}`
		);
	}, "references:");
	return `
${result}
`;
};

const fileContent = (data) => {
	return `---
title: ${data.title}
date: ${data.date}
category: ${data.category}
thumbnail:
  image: >-
    ${thumbnailFilePath(data.slug)}
  alt: >-
    ${data.thumbnail.alt ?? '""'}${referencesFrontMatter(data)}
---
${data.body}
`;
};

const downloadThumbnail = async (data) => {
	await mkdir(`./src/content/assets/articles/${data.slug}/thumbnail`, {
		recursive: true,
	});
	await mkdir(`./src/content/assets/articles/${data.slug}/references`, {
		recursive: true,
	});
	downloadImg(`http://localhost:4321/${data.thumbnail.image}`, thumbnailFilePath(data.slug));
};

const downloadReferences = async (data) => {
	if (!data.references || data.references.length === 0) return;
	data.references.forEach(async (el, i) => {
		await mkdir(`./src/content/assets/articles/${data.slug}/references/${i}`, {
			recursive: true,
		});
		downloadImg(`http://localhost:4321/${el.image}`, referenceFilePath(data.slug, i));
	});
};

const imagesGaleryFrontmatter = (data) =>
	data.images.reduce((acc, curr, i) => {
		return (
			acc +
			`
  - >-
    src/content/assets/galeries/${data.slug}/images/${i}.webp`
		);
	}, "images:");

const downloadImagesGallery = async (data) => {
	await mkdir(`./src/content/assets/galeries/${data.slug}/images`, {
		recursive: true,
	});
	data.images.forEach((el, i) => {
		downloadImg(
			`http://localhost:4321/${el}`,
			`./src/content/assets/galeries/${data.slug}/images/${i}.webp`,
		);
	});
};

/**
 * @param {string} url
 */
const fetchArticle = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	await writeFile(`src/content/articles/${data.slug}.mdx`, fileContent(data));
	await downloadThumbnail(data);
	await downloadReferences(data);
};

/**
 * @param {string} url
 */
const fetchGallery = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	downloadImagesGallery(data);
	await writeFile(
		`src/content/galeries/${data.slug}.mdx`,
		`---
title: ${data.title}
date: ${data.date}
${imagesGaleryFrontmatter(data)}
---`,
	);
};

// fetchArticle("http://localhost:4321/articles/data/mon-portrait-officiel")

fetchGallery("http://localhost:4321/galeries/data/les-habitations-id%C3%A9ales-des-3d--13-11-2023");

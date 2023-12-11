import { visit } from "unist-util-visit";
// replace images url for compatibity between tina cms and astro image optimisation
export function replaceImagesUrl() {
  function transform(tree) {
    visit(tree, "image", (node) => {
      // "@assets" shoulds be set as an alias of "src/assets/" in tsconfig
      node.url = node.url.replace("/src/content/assets/", "@assets/");
    });
  }
  return transform;
}

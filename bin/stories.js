const glob = require("glob");
const fs = require("fs");

const getStories = () => {
  return new Promise((resolve, reject) => {
    glob("**/*.stories.tsx", (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};

const parseStoryPath = (storyPath) => {
  const parts = storyPath.split("/");
  const name = parts[parts.length - 1].replace(".stories.tsx", "");

  /**
   * My components that are custom for specific posts live in a separate directory from
   * shared components and are sometimes generated by Babel. This part changes the import
   * to come from the build directory instead of the source.
   */
  let postName;
  const isContentComponent = parts[0] === "content";
  if (isContentComponent) {
    parts[0] = "_dist-content";
    postName = parts[1];
  }

  /**
   * The source file is a TS file, but sometimes the output is a JS file, so we
   * explicitly remove the extension here.
   */
  parts[parts.length - 1] = `${name}.stories`;
  const path = parts.join("/");

  return {
    name,
    isContentComponent,
    path,
    postName,
    asImport: `import * as ${name} from './${path}'`,
  };
};

const main = async () => {
  const files = (await getStories()).map(parseStoryPath);
  const imports = files.map(({ asImport }) => asImport).join(`\n`);
  const storiesProp = files
    .map(
      (story) =>
        `{ name: '${story.name}', variants: ${story.name}, postName: '${story.postName}' }`
    )
    .join(`,\n`);

  fs.writeFileSync(
    "./stories.meta.ts",
    `${imports}\nexport const stories = [${storiesProp}];`
  );
};

main();

const lintStagedConfig = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    `npx eslint --fix ${filenames
      .map((filename) => `"${filename}"`)
      .join(" ")}`,
  ],
  "**/*.(md|json)": (filenames) =>
    `npx prettier --write ${filenames
      .map((filename) => `"${filename}"`)
      .join(" ")}`,
};

export default lintStagedConfig;

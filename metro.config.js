/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require("path")
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const extraNodeModules = {
  "@components": path.resolve(__dirname, "components"),
  "@modules": path.resolve(__dirname, "modules"),
  "@screens": path.resolve(__dirname, "screens"),
  "@options": path.resolve(__dirname, "options"),
  "@store": path.resolve(__dirname, "store"),
  "@helpers": path.resolve(__dirname, "helpers")
}

const watchFolders = [
  path.resolve(__dirname, "components"),
  path.resolve(__dirname, "modules"),
  path.resolve(__dirname, "screens"),
  path.resolve(__dirname, "options"),
  path.resolve(__dirname, "store"),
  path.resolve(__dirname, "helpers")
]

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      "obj",
      "mtl",
      "JPG",
      "vrx",
      "hdr",
      "gltf",
      "glb",
      "bin",
      "arobject",
      "gif",
    ],
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from extraNodeModules to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), "node_modules", name)
    }),
    watchFolders,
    resetCache: true
  },
};

module.exports = mergeConfig(defaultConfig, config);

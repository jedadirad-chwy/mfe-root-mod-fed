const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const outputPath = path.resolve(__dirname, "dist");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: "http://localhost:9000/",
    libraryTarget: "system",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".ts", ".tsx"],
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["@babel/preset-react", { runtime: "automatic" }]],
        },
      },
      {
        parser: {
          system: false,
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "root-config",
      library: { type: "system" },
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1",
      },
      exposes: {
        AppContainer: "./src/App",
      },
      shared: ["react^18.2.0", "react-dom/client"],
    }),

    new CopyPlugin({ patterns: [{ from: "public", to: "." }] }),
  ],
};

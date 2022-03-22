const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "https://dahboard-dev.vercel.app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  watchOptions: {
    poll: 1000,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        // include: __dirname + "/app/",
        use: {
          loader: "babel-loader",
        },
        // query: {
        //     presets: ['es2015']
        // }
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mainapp",
      filename: "remoteEntry.js",
      remotes: {
        mainapp: "https://dahboard-dev.vercel.app/remoteEntry.js",
        social: "https://sosmed-dev.vercel.app/remoteEntry.js",
      },
      exposes: {
        "./CardTable": "./src/components/CardTable.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve("./src/index.html"),
    }),
  ],
};

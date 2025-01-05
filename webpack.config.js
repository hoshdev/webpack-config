const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js", // Punto de entrada de la aplicación
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.js$/, // Procesa archivos .js
          exclude: /node_modules/, // Excluye la carpeta node_modules
          use: "babel-loader", // Usa babel-loader para transpilar JS
        },
        {
          test: /\.tsx?$/, // Procesa archivos .ts y .tsx
          use: "ts-loader", // Usa ts-loader para transpilar TypeScript
          exclude: /node_modules/,
        },
        {
          test: /\.module\.css$/i, // Procesa archivos .module.css (modulos CSS)
          use: [
            "sass-loader", // Compila Sass/SCSS a CSS
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Inyecta CSS en el DOM
            ,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.module\.(s[ac]ss)$/i, // Proc  esa archivos .module.scss (modulos SCSS)
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Inyecta CSS en el DOM
            ,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
                esModule: false,
              },
            },
            "sass-loader", // Compila Sass/SCSS a CSS
          ],
        },
        {
          test: /\.(css)$/i, // Procesa archivos .css normales
          exclude: /\.module\.css$/i, // Excluye los archivos .module.css
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ], // Procesa CSS normal sin módulos
        },
        {
          test: /\.(s[ac]ss)$/i, // Procesa archivos .scss y .sass normales
          exclude: /\.module\.(s[ac]ss)$/i, // Excluye los archivos .module.scss
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Inyecta CSS en el DOM
            "css-loader", // Traduce CSS a módulos CommonJS
            "sass-loader", // Compila Sass/SCSS a CSS
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // Plantilla HTML
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
            new CompressionPlugin({
              algorithm: "gzip",
              test: /\.(js|css|html|svg)$/,
              threshold: 8192,
              minRatio: 0.8,
            }),
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
    devServer: !isProduction
      ? {
          static: path.join(__dirname, "public"),
          port: 3000,
          open: true,
          historyApiFallback: true,
        }
      : undefined,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
    },
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: { drop_console: true },
                format: { comments: false },
              },
              extractComments: false,
            }),
          ],
          splitChunks: {
            chunks: "all",
          },
        }
      : {},
  };
};

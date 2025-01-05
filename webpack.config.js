const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/index.js", // Punto de entrada de la aplicación
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Agregar hash basado en el contenido
    clean: true,
  },
  mode: "production", // Modo de desarrollo
  devtool: "source-map",
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
          "style-loader", // Inyecta CSS en el DOM
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
          MiniCssExtractPlugin.loader, // Inyecta CSS en el DOM
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
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Procesa CSS normal sin módulos
      },
      {
        test: /\.(s[ac]ss)$/i, // Procesa archivos .scss y .sass normales
        exclude: /\.module\.(s[ac]ss)$/i, // Excluye los archivos .module.scss
        use: [
          MiniCssExtractPlugin.loader, // Inyecta CSS en el DOM
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/, // Comprime JS, CSS, HTML y SVG
      threshold: 8192, // Tamaño mínimo en bytes para comprimir
      minRatio: 0.8, // Relación mínima de compresión
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // Genera un archivo HTML con el análisis
      openAnalyzer: false, // No abre automáticamente el análisis
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"), // Carpeta pública
    port: 3000, // Puerto del servidor de desarrollo
    open: true, // Abre el navegador automáticamente
    historyApiFallback: true, // Soporte para rutas en React
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Elimina console.log
          },
          format: {
            comments: false, // Elimina comentarios
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all", // Divide todo el código compartido
    },
  },
};

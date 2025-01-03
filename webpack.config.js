const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Punto de entrada de la aplicación
  output: {
    path: path.resolve(__dirname, "dist"), // Carpeta de salida
    filename: "bundle.js", // Nombre del archivo de salida
    clean: true, // Limpia la carpeta de salida antes de compilar
  },
  mode: "development", // Modo de desarrollo
  module: {
    rules: [
      {
        test: /\.js$/, // Procesa archivos .js
        exclude: /node_modules/, // Excluye la carpeta node_modules
        use: "babel-loader", // Usa babel-loader para transpilar JS
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
        test: /\.module\.(s[ac]ss)$/i, // Procesa archivos .module.scss (modulos SCSS)
        use: [
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
          "sass-loader", // Compila Sass/SCSS a CSS
        ],
      },
      {
        test: /\.(css)$/i, // Procesa archivos .css normales
        exclude: /\.module\.css$/i, // Excluye los archivos .module.css
        use: ["style-loader", "css-loader"], // Procesa CSS normal sin módulos
      },
      {
        test: /\.(s[ac]ss)$/i, // Procesa archivos .scss y .sass normales
        exclude: /\.module\.(s[ac]ss)$/i, // Excluye los archivos .module.scss
        use: [
          "style-loader", // Inyecta CSS en el DOM
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
  ],
  devServer: {
    static: path.join(__dirname, "public"), // Carpeta pública
    port: 3000, // Puerto del servidor de desarrollo
    open: true, // Abre el navegador automáticamente
    historyApiFallback: true, // Soporte para rutas en React
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"], // Resolución de extensiones
  },
};

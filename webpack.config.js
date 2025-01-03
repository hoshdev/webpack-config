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
        test: /\.css$/, // Procesa archivos CSS
        use: ["style-loader", "css-loader"], // Aplica style-loader y css-loader
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
    extensions: [".js", ".jsx"], // Archivos que Webpack debe resolver
  },
};


# Webpack Configuration for Development and Production

This repository contains a Webpack configuration optimized for both **development** and **production** environments. Below, you’ll find detailed explanations of the structure, plugins, loaders, and optimizations used in the configuration.

## **Getting Started**

### **Install Dependencies**

Before using this configuration, ensure all necessary dependencies are installed. Run the following command:

```bash
npm install
```

### **Run the Development Server**

Start the development server with:

```bash
npm run dev
```

### **Build for Production**

Generate the optimized production build:

```bash
npm run build
```

---

## **Configuration Overview**

### **Entry**
```javascript
entry: "./src/index.js",
```
- Specifies the starting point for Webpack to build the dependency graph.
- This is where Webpack begins analyzing your application.

### **Output**
```javascript
output: {
  path: path.resolve(__dirname, "dist"),
  filename: isProduction ? "[name].[contenthash].js" : "[name].js",
  clean: true,
},
```
- `path`: Defines the directory where the bundled files will be stored.
- `filename`: Outputs files with content hashes in production for better caching.
- `clean`: Ensures the `dist` directory is cleaned before every build.

### **Mode**
```javascript
mode: isProduction ? "production" : "development",
```
- Sets the build mode. 
  - `development` includes helpful features for debugging.
  - `production` optimizes for performance.

### **Devtool**
```javascript
devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
```
- Configures source map generation.
  - In development, faster source maps (`eval-cheap-module-source-map`) are used.
  - In production, full source maps (`source-map`) are created for debugging.

---

## **Loaders**

### **JavaScript/TypeScript Loader**
```javascript
{
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
}
```
- Processes `.ts` and `.tsx` files with `ts-loader`.
- Excludes `node_modules` to improve build performance.

### **CSS/SCSS Loaders**
#### CSS Modules
```javascript
{
  test: /\.module\.css$/i,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
  ],
}
```
- Handles `.module.css` files using `css-loader` with module support.
- Extracts CSS into separate files in production using `MiniCssExtractPlugin`.

#### Regular CSS/SCSS
```javascript
{
  test: /\.(css|s[ac]ss)$/i,
  exclude: /\.module\.(css|s[ac]ss)$/i,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    "sass-loader",
  ],
}
```
- Processes plain `.css` and `.scss` files.
- In development, injects CSS into the DOM with `style-loader`.
- In production, extracts CSS into separate files.

---

## **Plugins**

### **HtmlWebpackPlugin**
```javascript
new HtmlWebpackPlugin({
  template: "./public/index.html",
}),
```
- Generates an HTML file based on a template.
- Automatically injects the compiled JavaScript and CSS into the HTML.

### **MiniCssExtractPlugin**
```javascript
new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
}),
```
- Extracts CSS into separate files in production.
- Uses content hashes to enable long-term caching.

### **CompressionPlugin**
```javascript
new CompressionPlugin({
  algorithm: "gzip",
  test: /\.(js|css|html|svg)$/,
}),
```
- Compresses assets using Gzip for faster delivery.

### **BundleAnalyzerPlugin**
```javascript
new BundleAnalyzerPlugin({
  analyzerMode: "static",
  openAnalyzer: false,
}),
```
- Generates a static report to analyze bundle size and dependencies.

---

## **Optimization**

### **TerserPlugin**
```javascript
new TerserPlugin({
  terserOptions: {
    compress: { drop_console: true },
    format: { comments: false },
  },
}),
```
- Minifies JavaScript in production.
- Removes `console.log` statements and comments for a cleaner output.

### **SplitChunks**
```javascript
splitChunks: {
  chunks: "all",
},
```
- Splits vendor and common code into separate chunks for better caching.

---

## **Development Server**
```javascript
devServer: {
  static: path.join(__dirname, "public"),
  port: 3000,
  open: true,
  historyApiFallback: true,
},
```
- Serves content from the `public` directory.
- Automatically opens the browser on `http://localhost:3000`.
- Enables support for React Router’s client-side routing.

---

## **File Structure**

```
├── public
│   └── index.html   # HTML template
├── src
│   ├── index.js     # Main entry point
│   └── styles.css   # Example styles
├── webpack.config.js # Webpack configuration
├── package.json      # Project dependencies and scripts
└── README.md         # Documentation
```

---

## **Custom Scripts**

### **Development**
```json
"scripts": {
  "dev": "webpack serve --mode development"
}
```
- Starts the Webpack development server.

### **Production**
```json
"scripts": {
  "build": "webpack --mode production"
}
```
- Creates a production-ready build.

---

## **License**

This project is licensed under the MIT License. See `LICENSE` for more details.

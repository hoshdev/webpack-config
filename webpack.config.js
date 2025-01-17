const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"; // Determine if the environment is production

  return {
    entry: "./src/index.js", // Entry point for the application
    output: {
      path: path.resolve(__dirname, "dist"), // Output directory
      filename: isProduction ? "[name].[contenthash].js" : "[name].js", // Output filename with content hash in production
      clean: true, // Clean the output directory before building
      publicPath: "/", // When reloading, consider path from client.
    },
    mode: isProduction ? "production" : "development", // Set mode based on environment
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map", // Generate source maps for debugging
    module: {
      rules: [
        {
          test: /\.js$/, // Matches .js files
          exclude: /node_modules/, // Exclude node_modules from processing
          use: "babel-loader", // Use Babel to transpile JavaScript files
        },
        {
          test: /\.tsx?$/, // Matches .ts and .tsx files
          use: "ts-loader", // Use ts-loader to transpile TypeScript files
          exclude: /node_modules/, // Exclude node_modules from processing
        },
        {
          test: /\.module\.css$/i, // Matches .module.css files (CSS modules)
          use: [
            "sass-loader", // Compile Sass/SCSS into CSS
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Use MiniCssExtractPlugin for production; inject CSS into DOM otherwise
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]", // Generate unique class names for CSS modules
                },
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.module\.(s[ac]ss)$/i, // Matches .module.scss files (SCSS modules)
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Extract CSS in production; inject CSS otherwise
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]", // Generate unique class names for SCSS modules
                },
                esModule: false,
              },
            },
            "sass-loader", // Compile Sass/SCSS into CSS
          ],
        },
        {
          test: /\.(css)$/i, // Matches plain .css files
          exclude: /\.module\.css$/i, // Exclude CSS modules
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Extract CSS in production; inject CSS otherwise
            "css-loader", // Process CSS files
          ],
        },
        {
          test: /\.(s[ac]ss)$/i, // Matches plain .scss and .sass files
          exclude: /\.module\.(s[ac]ss)$/i, // Exclude SCSS modules
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader", // Extract CSS in production; inject CSS otherwise
            "css-loader", // Process CSS files
            "sass-loader", // Compile Sass/SCSS into CSS
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // Generate an HTML file based on a template
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css", // Extract CSS into separate files with content hash
            }),
            new CompressionPlugin({
              algorithm: "gzip", // Use Gzip for compression
              test: /\.(js|css|html|svg)$/, // Target specific file types
              threshold: 8192, // Only compress files larger than 8 KB
              minRatio: 0.8, // Compress files with a minimum compression ratio of 0.8
            }),
            new BundleAnalyzerPlugin({
              analyzerMode: "static", // Generate a static analysis report
              openAnalyzer: false, // Do not open the report automatically
            }),
          ]
        : []), // Add production-specific plugins
    ],
    devServer: !isProduction
      ? {
          static: path.join(__dirname, "public"), // Serve files from the public directory
          port: 3000, // Development server port
          open: true, // Open the browser automatically
          historyApiFallback: true, // Enable support for React Router's client-side routing
        }
      : undefined, // Only configure devServer in development mode
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // Alias para la carpeta src
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"], // Automatically resolve these extensions
    },
    optimization: isProduction
      ? {
          minimize: true, // Minimize output files
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: { drop_console: true }, // Remove console.log statements
                format: { comments: false }, // Remove comments in production builds
              },
              extractComments: false, // Do not extract comments into separate files
            }),
          ],
          splitChunks: {
            chunks: "all", // Split chunks for better caching
          },
        }
      : {}, // Only configure optimization in production mode
  };
};

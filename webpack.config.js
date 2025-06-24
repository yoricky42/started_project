import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  mode: "development", // passe en 'production' pour build optimisé

  entry: "./assets/ts/index.ts", // ton fichier d'entrée TS principal

  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    clean: true, // vide le dossier dist avant build
  },

  resolve: {
    extensions: [".ts", ".js"], // pour que webpack résolve ces extensions
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader", // compile TS vers JS
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          "css-loader", // traduit CSS en JS
          "postcss-loader", // ← AJOUT OBLIGATOIRE pour Tailwind
          "thread-loader", // ← booste les performances
          "sass-loader", // compile SCSS en CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Webpack 5 gère les fichiers ressources
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Assure-toi d'avoir ce fichier
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // fichier CSS généré
    }),
  ],
  devServer: {
    watchFiles: ["./**/*.html"],
    static: "./dist",
    hot: true,
    port: 3000,
  },
};

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const webpack = require("webpack");
const pages = require("./config.js");
// import { pages } from "config.js";

module.exports = {
  entry: {
    main: "./src/app.js",
    home: "./src/js/home.js"
  },
  output: {
    //publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name][hash:8].js"
  },
  devtool: "source-map",
  devServer: {
    open: true
    //   contentBase: "images",
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./src/images/o.png"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {
          helperDirs: __dirname + "/src/helpers/"
        }
      }
    }),
    new CopyWebpackPlugin([{
      from: "src/images",
      to: "images"
    }]),

    new ExtractTextPlugin("style.css"),

    ...pages.map(
      page =>
      new HtmlWebpackPlugin({
        hash: page.hash,
        title: page.title,
        filename: page.filename,
        excludeChunks: page.excludeChunks,
        meta: page.meta,
        template: page.template
      })
    ),

    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: { loader: "css-loader" }
      // },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: ["file-loader"]
      // },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/", // where the fonts will go
            publicPath: "./fonts" // override the default path
          }
        }]
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
        query: {
          partialDirs: [path.join(__dirname, "templates", "partials")]
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader"
      // },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "./images/[name].[ext]"
          }
        }
      }
    ]
  }
};
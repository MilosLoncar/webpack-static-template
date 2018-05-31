const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const pug = require("pug-loader");
const webpack = require("webpack");
const pages = require("./config.js");

module.exports = {
  entry: {
    main: "./src/app.js",
    home: "./src/js/home.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "source-map",
  devServer: {
    open: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    }
    //   contentBase: "images",
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./src/images/favicon.png"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/images",
        to: "images"
      }
    ]),
    new ExtractTextPlugin("style.css"),
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          ...page
        })
    ),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true
    })
  ],
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/", // where the fonts will go
              publicPath: "./fonts" // override the default path
            }
          }
        ]
      },
      {
        test: /.pug$/,
        use: {
          loader: "pug-loader",
          options: {
            self: true
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
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

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");

const webpack = require("webpack");
module.exports = {
  entry: ["./src/app.js"],
  output: {
    //publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle[hash:8].js"
  },
  devtool: "source-map",
  // devServer: {
  //   contentBase: "images"
  // },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {
          helperDirs: __dirname + "/src/helpers/"
        }
      }
    }),
    new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),

    new ExtractTextPlugin("style.css"),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   filename: "index.html",
    //   title: "Custom temlate",
    //   template: __dirname + "/src/html/index.ejs"
    // }),
    new HtmlWebpackPlugin({
      hash: true,
      title: "Smart Chain Technology - Home",
      filename: "index.html",
      inject: "body",
      meta: {
        viewport: "width=device-width, initial-scale=1"
      },
      template: __dirname + "/src/html/index.handlebars"
    }),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   title: "Smart Chain Technology - About",
    //   filename: "about.html",
    //   meta: {
    //     viewport: "width=device-width, initial-scale=1"
    //   },
    //   template: __dirname + "/src/html/about.handlebars"
    // }),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   title: "Smart Chain Technology - Team",
    //   filename: "team.html",
    //   meta: {
    //     viewport: "width=device-width, initial-scale=1"
    //   },
    //   template: __dirname + "/src/html/team.handlebars"
    // }),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   title: "Smart Chain Technology - Contact",
    //   filename: "contact.html",
    //   meta: {
    //     viewport: "width=device-width, initial-scale=1"
    //   },
    //   template: __dirname + "/src/html/contact.handlebars"
    // }),
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

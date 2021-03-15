const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootDir       = __dirname;
const srcDir        = path.resolve(rootDir, "src");
const componentsDir = path.resolve(srcDir, "components");
const hooksDir      = path.resolve(srcDir, "hooks");
const assetsDir     = path.resolve(srcDir, "assets");
const distDir       = path.resolve(rootDir, "dist");
const ghPagesDir    = path.resolve(rootDir, "gh-pages");

const entryFileName    = "index.tsx";
const templateFileName = "index.hbs";
const faviconFileName  = "favicon.ico";

const dotenv = require("dotenv").config({
    path: path.resolve(rootDir, ".env")
}).parsed;

const postCssLoader = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            config: "postcss.config.js"
        }
    }
};

module.exports = env => {
    const config = getConfig(env.config);

    const result = {
        mode: config.mode,
        entry: path.resolve(srcDir, entryFileName),
        output: {
            filename:   "static/js/[name].[fullhash].js",
            path:       config.outputPath,
            publicPath: config.publicPath
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader"
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        config.styleLoader,
                        "css-loader",
                        postCssLoader,
                        "sass-loader"
                    ]
                },
                {
                    test: /\.js$/,
                    loader: "source-map-loader",
                    enforce: "pre"
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "static/fonts/[name].[hash][ext]"
                    }
                },
                {
                    test: /\.(ogg|mp3|wav|mpe?g)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "static/audio/[name].[hash][ext]"
                    }
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },
                {
                    test: /\.hbs$/,
                    "loader": "handlebars-loader"
                }
            ]
        },
        plugins: config.plugins,
        resolve: {
            alias: {
                "$src":        srcDir,
                "$components": componentsDir,
                "$hooks":      hooksDir,
                "$assets":     assetsDir,
            },
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
        },
        devServer: {
            contentBase: distDir,
            hot: true
        },
        devtool: config.devtool,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {drop_console: true}
                    }
                })
            ]
        }
    };

    return result;
};

function getConfig(config) {
    const plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!.git"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, templateFileName),
            favicon:  path.resolve(assetsDir, "images", faviconFileName),
            inject:   false
        })
    ];

    let mode, devtool, styleLoader;
    if (config === "development") {
        mode = "development";
        devtool = "inline-source-map";
        styleLoader = "style-loader";
    } else {
        mode = "production";
        devtool = false;
        styleLoader = MiniCssExtractPlugin.loader;

        plugins.unshift(new MiniCssExtractPlugin({
            filename: "static/css/[name].[fullhash].css"
        }));
    }

    let outputPath, publicPath;
    if (config === "gh-pages") {
        outputPath = ghPagesDir;
        publicPath = `/${dotenv.REPO_NAME}/`;
    } else {
        outputPath = distDir;
        publicPath = "/";
    }

    return {
        mode: mode,
        outputPath: outputPath,
        publicPath: publicPath,
        devtool: devtool,
        styleLoader: styleLoader,
        plugins: plugins
    };
}

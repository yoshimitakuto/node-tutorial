module.exports = {
    entry: {
        build: "./src/index.ts",
    },
    output: {
        path: `${__dirname}/dist`,
        filename: "bundle.js",
    },
    // mode: "development",
    mode: "production",
    resolve: {
        extensions: [".ts", ".js"], //from ~~.js/~~.tsを書かなくても問題ないようにする
    },
    devServer: {
        static: {
            directory: `${__dirname}/dist`,
        },
        open: true,
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: "ts-loader"
            },
        ],
    },
};
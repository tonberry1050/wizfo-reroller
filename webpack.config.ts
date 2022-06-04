import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isWatch = process.env.NODE_ENV === 'watch';
const isDev = process.env.NODE_ENV === 'development' || isWatch;

const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  externals: ['fsevents'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
    // 画像などのアセット類は 'dist/assets' フォルダへ配置する
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.main.json",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(ico|png|jpe?g|svg|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  watch: isWatch,
  devtool: isDev ? 'inline-source-map' : undefined,
};

// メインプロセス向け設定
const main: Configuration = {
  ...common,
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/script', to: 'script' },
      ]
    }),
    new HtmlWebpackPlugin({
      meta: isDev ? { // add meta tag for dev to allow eval to use source-map
        'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
      } : {}
    }),
  ],
};

// プリロードスクリプト向け設定
const preload: Configuration = {
  ...common,
  target: 'electron-preload',
  entry: {
    preload: './src/preload.ts',
  },
};

// レンダラープロセス向け設定
const renderer: Configuration = {
  ...common,
  target: 'web',
  entry: {
    app: './src/web/app.tsx',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/web/index.html',
      meta: {
        "Content-Security-Policy": isDev ? // change meta-tag to use vscode-live-server in dev
          {"http-equiv": "Content-Security-Policy", "content": "default-src 'self'; img-src 'self' https://* data:; child-src 'none'; script-src 'self' 'unsafe-inline';" } :
          {"http-equiv": "Content-Security-Policy", "content": "default-src 'self'; img-src 'self' https://* data:; child-src 'none';" },
      }
    }),
  ],
};

export default [main, preload, renderer];
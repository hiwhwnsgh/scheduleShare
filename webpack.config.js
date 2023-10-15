const path = require('path');

module.exports = {
  mode: 'development', // 또는 'production'
  entry: './src/index.js', // 애플리케이션 진입점 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들 파일 출력 경로
    filename: 'bundle.js', // 번들 파일 이름
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          } // JavaScript 파일을 변환하는 로더 (Babel 등)
        },
        
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // 개발 서버의 루트 디렉토리
    port: 3000, // 개발 서버 포트
    liveReload: true,
    // host 지정
    host: "0.0.0.0",
    allowedHosts: "all",
    open: true,
    client: {
      overlay: true,
      // 웹소켓용 url 지정
      webSocketURL: "ws://0.0.0.0:8080",
    },
    compress: true,
  },
};

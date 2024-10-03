const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {  // '/api'로 시작하는 요청만 프록시
      target: "http://localhost:8080", // 백엔드 서버의 URL
      changeOrigin: true,
    })
  );
};

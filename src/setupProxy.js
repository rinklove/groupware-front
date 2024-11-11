const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/stomp-endpoint", // WebSocket 경로 설정
    createProxyMiddleware({
      target: "http://localhost:8080",  // WebSocket 서버 URL (이곳을 실제 WebSocket 서버 주소로 변경)
      ws: true,  // WebSocket을 프록시하도록 설정
      changeOrigin: true, // origin을 타겟 서버로 맞춤 (웹소켓 연결을 위한 설정)
    })
  );
};
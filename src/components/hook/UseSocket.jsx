import { Client } from '@stomp/stompjs';
import { ACCESS_TOKEN, BEARER } from '../../constants/auth';

const SOCKET_URL = 'ws://localhost:8080/stomp-endpoint';
const JWT_TOKEN = localStorage.getItem(ACCESS_TOKEN); // JWT 토큰을 로컬스토리지에서 가져옵니다.

export class UseSocket {
  constructor() {
    this.isConnected = false;
    this.client = new Client({
      webSocketFactory: () => new WebSocket(SOCKET_URL),
      debug: function (str) {
        console.log('STOMP Debug: ' + str);
      },
      connectHeaders: {
        Authorization: `${BEARER}${JWT_TOKEN}`, // WebSocket 연결 시 헤더에 JWT 토큰 추가
      },
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.isConnected = true;
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        this.isConnected = false;
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.onConnect = () => {
        this.isConnected = true;
        resolve();
      };

      this.client.onDisconnect = () => {
        this.isConnected = false;
      };

      this.client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        reject(new Error('STOMP error: ' + frame.body));
      };

      this.client.activate();
    });
  }

  disconnect() {
    if (this.client && this.isConnected) {
      this.client.deactivate();
      this.isConnected = false;
    }
  }

  subscribe(destination, callback) {
    if (this.isConnected) {
      console.log("Subscribing to: ", destination);
      return this.client.subscribe(destination, callback);
    } else {
      throw new Error('No active STOMP connection');
    }
  }

  send(destination, body) {
    if (this.isConnected) {
      console.log("Publishing to: ", destination);
      this.client.publish({ destination, body });
    } else {
      throw new Error('No active STOMP connection');
    }
  }
}

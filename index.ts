import { Elysia } from "elysia";
import dotenv from "dotenv";
import { sql } from "./src/db";
import { redis } from "./src/redis";
import { WebSocketServer } from "ws";

dotenv.config();

const app = new Elysia();

// Example route
app.get("/", () => "Shift backend running!");

// Start server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Shift backend running on http://localhost:${port}`));

// WebSocket server for social rooms
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  ws.send("Welcome to Shift WebSocket server!");
});
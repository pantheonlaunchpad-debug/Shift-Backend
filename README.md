---

# **Shift Backend**

Backend for **Shift** built with **Bun + ElysiaJS**, PostgreSQL, Redis, JWT authentication, and WebSockets for real-time social rooms.

---

## **Tech Stack**

* **Runtime:** Bun (High-performance, native TypeScript support)
* **Framework:** ElysiaJS (Type-safe, lightweight backend)
* **Database:** PostgreSQL (Primary)
* **Cache / Real-time Session Locks:** Redis
* **Authentication:** JWT (JSON Web Token) with sliding window refresh
* **Real-time:** WebSockets (for social rooms & session sync)
* **Environment Management:** dotenv

---

## **Project Structure**

```
Shift-Backend/
├─ index.ts               # Main server entry
├─ tsconfig.json          # TypeScript config
├─ package.json           # Bun dependencies
├─ .gitignore
├─ README.md
├─ .env                   # Environment variables (not tracked)
├─ src/
│  ├─ db.ts               # PostgreSQL connection
│  ├─ redis.ts            # Redis connection
│  ├─ routes/
│  │  ├─ auth.ts          # Authentication routes (login, signup)
│  │  ├─ users.ts         # User CRUD routes
│  │  ├─ sessions.ts      # Session locks management
│  └─ websockets.ts       # WebSocket server for social rooms
```

---

## **Setup Instructions**

### **1. Prerequisites**

* **Bun** ≥ 1.3.x
* **PostgreSQL** ≥ 17
* **Redis** (Windows version from [https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases))
* **Git** (for cloning repo)

---

### **2. Clone Repository**

```bash
git clone https://github.com/Pantheon-launchpad/Shift-Backend.git
cd Shift-Backend
```

---

### **3. Install Dependencies**

```bash
bun install
bun add elysia postgres redis ws jsonwebtoken dotenv
bun add -d @types/jsonwebtoken @types/ws
```

---

### **4. Create `.env` File**

Create `.env` in project root:

```
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/shift
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

> Replace credentials with your actual PostgreSQL and Redis setup.

---

### **5. Setup PostgreSQL Database**

1. Open PostgreSQL terminal:

```powershell
cd "C:\Program Files\PostgreSQL\17\bin"
.\psql -U postgres -h localhost
```

2. Create database:

```sql
CREATE DATABASE shift;
```

3. (Optional) Create dedicated user:

```sql
CREATE USER shift_user WITH PASSWORD 'shift_password';
GRANT ALL PRIVILEGES ON DATABASE shift TO shift_user;
```

Update `.env` if using a dedicated user:

```
DATABASE_URL=postgresql://shift_user:shift_password@localhost:5432/shift
```

---

### **6. Setup Redis**

1. Download and unzip Redis for Windows to `C:\Redis`.
2. Start Redis server:

```powershell
cd C:\Redis
redis-server.exe
```

3. Test connection:

```powershell
redis-cli.exe ping
```

Output should be:

```
PONG
```

---

### **7. Run the Backend**

```bash
bun index.ts
```

* API will be available at `http://localhost:3000`
* WebSocket server at `ws://localhost:8080`

---

### **8. Database Tables / Migrations**

Create tables for **users, sessions, social_rooms** (example SQL):

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Social Rooms
CREATE TABLE social_rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### **9. Testing**

* **PostgreSQL Connection Test:**

```ts
const result = await sql`SELECT NOW()`;
console.log(result);
```

* **Redis Test:**

```ts
await redis.set("test-key", "hello");
console.log(await redis.get("test-key")); // hello
```

---

### **10. Additional Notes**

* All sensitive credentials should be stored in `.env` and **never committed**.
* WebSockets handle **real-time updates** for social rooms and session sync.
* JWT uses sliding window refresh for session management.

---

### **11. Run Commands Summary**

```bash
bun install                  # Install dependencies
bun index.ts                 # Run backend server
```

---
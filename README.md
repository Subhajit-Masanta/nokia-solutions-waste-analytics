# nokia-waste-analytics

Backend (Api) + frontend (ui) for the food-wastage analytics dashboard. The backend exposes REST + WebSocket endpoints over Express, and the frontend is a React app built with Create React App.

## Repo layout

- `Api/` – Express API (REST + WebSocket) and MSSQL access.
- `ui/` – React dashboard UI (CRA).

## Prerequisites

- Node.js 18+ and npm
- MSSQL database credentials

## Quick start

1. Install deps (run once per workspace):

```bash
cd Api && npm install
cd ../ui && npm install
```

2. Configure env files:
   - `Api/.env` (create):

```bash
PORT=5000
DB_USER=your_user
DB_PASSWORD=your_password
DB_SERVER=your_server
DB_NAME=your_db
# Optional
NODE_ENV=development
```

- `ui/.env` (create):

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000/ws
```

3. Run API and UI (separate terminals):

```bash
cd Api
npm run dev
# new terminal
cd ui
npm start
```

## API notes

Base URL: `http://localhost:5000/api`

- `GET /health` – service status.
- `GET /comparision` – weekly comparisons.
- `GET /weights` – session weight list.
- `GET /weekly-chart` – weekly chart data.
- `GET /monthly-chart` – monthly chart data.
- `GET /monthly-waste` – current month waste summary.
  WebSocket: `ws://localhost:5000/ws` (see `Api/Websocket.js`).

## Security

Environment variables keep secrets out of source control. Replace hard-coded DB credentials in `Api/Config/db.js` with values from `process.env` before production use.

## Scripts

- API: `npm run dev` (nodemon), `npm start`
- UI: `npm start`, `npm run build`, `npm test`

## Testing

No automated tests are configured yet. Add backend route/unit tests and frontend component tests before releasing.

## Contributors

- Subhajit Masanta (intern, Vellore Institute of Technology)

## License / Usage

- Proprietary / all rights reserved by Nokia Solutions and Networks India Pvt. Ltd.
- See `LICENSE` for permitted internal use. Do not redistribute outside the organization without written approval.

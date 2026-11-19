# WASLA

WASLA is a construction company management system. This repository contains the project scaffold for the web application, API, database work, and team documentation.

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, JavaScript / JSX, Vite 8, React Router 8 |
| Backend | ASP.NET Core Web API on .NET 10 |
| Data access | Entity Framework Core 10 with the SQL Server provider |
| Database | Microsoft SQL Server |
| Version control | Git and GitHub |

## Repository layout

```text
frontend/
  public/
  src/
    assets/
    components/
      common/
      layout/
    pages/
      auth/
      admin/
      engineer/
      client/
      worker/
      supplier/
    layouts/
    routes/
    services/
    context/
    hooks/
    styles/
backend/
  WASLA.sln
  src/
    WASLA.API/
      Controllers/
      DTOs/
      Services/
      Middleware/
      Properties/
    WASLA.Domain/
      Entities/
      Enums/
    WASLA.Infrastructure/
      Data/
      Configurations/
      Migrations/
database/
  scripts/
  seed-data/
  README.md
docs/
  ERD/
  API-Contract/
  Architecture/
  FILE-MAP.md
```

The [file map](docs/FILE-MAP.md) describes every tracked file in the initial scaffold. `WASLA.API` references `WASLA.Domain` and `WASLA.Infrastructure`. `WASLA.Infrastructure` references `WASLA.Domain`, which has no project dependencies.

## Prerequisites

- Git, Node.js 22.22.0 or later, and npm.
- The .NET 10 SDK.
- For the database phase, use a reachable SQL Server instance. SQL Server Developer edition is available for local development and testing. The current scaffold builds and runs without a SQL Server instance. See the [database setup notes](database/README.md).

## Run locally

Clone the repository and enter its root directory.

```sh
git clone https://github.com/Fady-Fawzy/WASLA.git
cd WASLA
```

### Frontend

```sh
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173` or the URL printed by Vite. The links exercise the reserved authentication and role routes. Each destination is a public placeholder. Configure authentication and authorization when implementing those areas. If you later deploy the frontend, configure your web host to serve `index.html` for routes handled by React Router.

`frontend/.env.example` shows the variable reserved for a future API client. Vite exposes `VITE_` variables to the browser. Keep credentials in backend configuration or a secret store.

From `frontend/`, run `npm run build` to check the production bundle.

### Backend

From the repository root, use a second terminal.

```sh
dotnet restore backend/WASLA.sln
dotnet build backend/WASLA.sln --no-restore
dotnet run --project backend/src/WASLA.API --no-build
```

Open `http://localhost:5080/health`. The endpoint returns `200 OK` with `Healthy` when the API process is running. It checks process health only.

## Team workflow

- `main` is the default branch and represents the stable version.
- `develop` integrates reviewed changes.
- Start each contribution from the latest `develop` and push your own branch.

```sh
git switch develop
git pull --ff-only origin develop
git switch -c task/short-description
# Edit the files, run the relevant checks, and commit the changes.
git push -u origin task/short-description
```

Open a GitHub pull request with `develop` as the base. Explain the change, list the checks you ran, and request a teammate's review. When the team is ready for a stable version, open a pull request from `develop` into `main`. Collaborators can push branches after accepting their GitHub invitations.

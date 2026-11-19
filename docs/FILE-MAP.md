# File map

This inventory covers the initial WASLA scaffold. Empty `.gitkeep` files preserve planned directories in Git.

| File | Purpose |
| --- | --- |
| `.gitignore` | Excludes generated outputs, local configuration, and common credential files from Git. |
| `README.md` | Introduces WASLA and documents local setup and the team workflow. |
| `backend/WASLA.sln` | Groups the three .NET projects for solution-wide builds. |
| `backend/src/WASLA.API/Controllers/.gitkeep` | Reserves the directory for API controllers. |
| `backend/src/WASLA.API/DTOs/.gitkeep` | Reserves the directory for API request and response models. |
| `backend/src/WASLA.API/Middleware/.gitkeep` | Reserves the directory for HTTP middleware. |
| `backend/src/WASLA.API/Program.cs` | Starts the Web API and exposes a process health endpoint. |
| `backend/src/WASLA.API/Properties/launchSettings.json` | Configures the local HTTP launch profile on port 5080. |
| `backend/src/WASLA.API/Services/.gitkeep` | Reserves the directory for API services. |
| `backend/src/WASLA.API/WASLA.API.csproj` | Defines the ASP.NET Core API project and its project references. |
| `backend/src/WASLA.API/appsettings.json` | Sets the API logging defaults. |
| `backend/src/WASLA.Domain/Entities/.gitkeep` | Reserves the directory for domain entities. |
| `backend/src/WASLA.Domain/Enums/.gitkeep` | Reserves the directory for domain enumerations. |
| `backend/src/WASLA.Domain/WASLA.Domain.csproj` | Defines the dependency-free domain library. |
| `backend/src/WASLA.Infrastructure/Configurations/.gitkeep` | Reserves the directory for persistence mappings. |
| `backend/src/WASLA.Infrastructure/Data/.gitkeep` | Reserves the directory for persistence code. |
| `backend/src/WASLA.Infrastructure/Migrations/.gitkeep` | Reserves the directory for migrations if the team adopts that workflow. |
| `backend/src/WASLA.Infrastructure/WASLA.Infrastructure.csproj` | Defines the infrastructure library and references the EF Core SQL Server provider. |
| `database/README.md` | Explains database prerequisites, reserved directories, and credential handling. |
| `database/scripts/.gitkeep` | Reserves the directory for reviewed SQL scripts. |
| `database/seed-data/.gitkeep` | Reserves the directory for non-sensitive development fixtures. |
| `docs/API-Contract/.gitkeep` | Reserves the directory for API contracts. |
| `docs/Architecture/.gitkeep` | Reserves the directory for architecture documentation. |
| `docs/ERD/.gitkeep` | Reserves the directory for entity–relationship diagrams. |
| `docs/FILE-MAP.md` | Lists every tracked file in the initial scaffold and describes its purpose. |
| `frontend/.env.example` | Shows the public API origin setting reserved for future integration. |
| `frontend/.gitignore` | Excludes frontend caches and generated test reports from Git. |
| `frontend/index.html` | Hosts the React application and loads the Vite entry point. |
| `frontend/package-lock.json` | Locks exact frontend dependency versions and integrity hashes for reproducible installs. |
| `frontend/package.json` | Declares the frontend dependencies, Node requirement, and npm scripts. |
| `frontend/public/.gitkeep` | Reserves the directory for static files served as-is by Vite. |
| `frontend/src/App.jsx` | Renders the starter shell, placeholder routes, and page-not-found screen. |
| `frontend/src/assets/.gitkeep` | Reserves the directory for assets imported by the frontend. |
| `frontend/src/components/common/.gitkeep` | Reserves the directory for shared UI components. |
| `frontend/src/components/layout/.gitkeep` | Reserves the directory for reusable layout components. |
| `frontend/src/context/.gitkeep` | Reserves the directory for React context providers. |
| `frontend/src/hooks/.gitkeep` | Reserves the directory for reusable React hooks. |
| `frontend/src/layouts/.gitkeep` | Reserves the directory for page layouts. |
| `frontend/src/main.jsx` | Mounts the React application and enables browser-history routing. |
| `frontend/src/pages/admin/.gitkeep` | Reserves the directory for administrator screens. |
| `frontend/src/pages/auth/.gitkeep` | Reserves the directory for authentication screens. |
| `frontend/src/pages/client/.gitkeep` | Reserves the directory for client screens. |
| `frontend/src/pages/engineer/.gitkeep` | Reserves the directory for engineer screens. |
| `frontend/src/pages/supplier/.gitkeep` | Reserves the directory for supplier screens. |
| `frontend/src/pages/worker/.gitkeep` | Reserves the directory for worker screens. |
| `frontend/src/routes/plannedAreas.js` | Defines the reserved authentication and role paths. |
| `frontend/src/services/.gitkeep` | Reserves the directory for API clients and frontend services. |
| `frontend/src/styles/base.css` | Styles the starter shell and its responsive navigation. |
| `frontend/vite.config.js` | Enables React JSX and Fast Refresh in Vite. |

# Database

`scripts/` is reserved for reviewed SQL scripts. `seed-data/` is reserved for non-sensitive development fixtures.

The API scaffold starts without a database connection. Before implementing persistence, confirm the database workflow (Database First or Code First), choose a supported SQL Server instance, and verify that the development team can connect with the agreed authentication method.

When database integration is approved, supply connection strings through ASP.NET Core user secrets or environment variables for local development and through the deployment environment's secret store for hosted use. Keep database files, credentials, and operational data out of this public repository.

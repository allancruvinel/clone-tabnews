import database from "infra/database.js";

async function status(req, res) {
  const maxConnections = await database.query("SHOW max_connections;");
  const usedConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const postgresVersion = await database.query("SHOW server_version;");
  const updatedAt = new Date().toISOString();
  console.log(usedConnections.rows[0].count);
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        opened_connections: parseInt(usedConnections.rows[0].count),
        version: postgresVersion.rows[0].server_version,
      },
    },
  });
}

export default status;

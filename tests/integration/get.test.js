test("GET to /api/v1/status should return 200 and corrected data", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);
  expect(
    parseInt(responseBody.dependencies.database.max_connections),
  ).toBeGreaterThan(1);
  expect(parseInt(responseBody.dependencies.database.opened_connections)).toBe(
    1,
  );
  expect(responseBody.dependencies.database.version).toBe("16.1");
});

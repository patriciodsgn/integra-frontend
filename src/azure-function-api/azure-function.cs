using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Collections.Generic;
using Newtonsoft.Json;

public static class TestDataFunction
{
    private static string ConnectionString = "Server=azsql-sgi-integra.database.windows.net;" +
                                           "Database=azsql-sgi-integra-bd;" +
                                           "User Id=sistemagestionintegral@integra;" +
                                           "Password=TU_PASSWORD;" +
                                           "Encrypt=true";

    [FunctionName("TestData")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "test-data")] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var results = new List<Dictionary<string, object>>();

        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                await conn.OpenAsync();
                
                // Modifica esta consulta según tu tabla
                using (SqlCommand cmd = new SqlCommand(
                    "SELECT TOP 10 * FROM TuTabla", conn))
                {
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var row = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                row[reader.GetName(i)] = reader.GetValue(i);
                            }
                            results.Add(row);
                        }
                    }
                }
            }

            return new OkObjectResult(results);
        }
        catch (Exception ex)
        {
            log.LogError($"Error: {ex.Message}");
            return new StatusCodeResult(500);
        }
    }
}

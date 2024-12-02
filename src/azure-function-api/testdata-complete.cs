using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Company.Function
{
    public static class TestData
    {
        private static readonly string ConnectionString = "Server=azsql-sgi-integra.database.windows.net;" +
                                                        "Database=azsql-sgi-integra-bd;" +
                                                        "User Id=sistemagestionintegral@integra;" +
                                                        "Password=TU_PASSWORD;" +
                                                        "Encrypt=true";

        [FunctionName("TestData")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "test-data")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processing request.");
            var results = new List<Dictionary<string, object>>();

            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    await conn.OpenAsync();
                    
                    // Modifica esta consulta según tu tabla
                    var sql = @"
                        SELECT TOP 10 *
                        FROM TuTabla -- Reemplaza 'TuTabla' con el nombre real de tu tabla
                        ORDER BY 1 DESC
                    ";
                    
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var row = new Dictionary<string, object>();
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    var value = reader.GetValue(i);
                                    row[reader.GetName(i)] = value == DBNull.Value ? null : value;
                                }
                                results.Add(row);
                            }
                        }
                    }
                }

                return new OkObjectResult(new { 
                    success = true, 
                    data = results,
                    count = results.Count,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                log.LogError($"Error processing request: {ex.Message}");
                log.LogError($"Stack trace: {ex.StackTrace}");
                
                return new ObjectResult(new
                {
                    success = false,
                    error = "Error interno del servidor",
                    message = ex.Message,
                    timestamp = DateTime.UtcNow
                })
                {
                    StatusCode = 500
                };
            }
        }

        [FunctionName("GetDataById")]
        public static async Task<IActionResult> GetById(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "test-data/{id}")] HttpRequest req,
            string id,
            ILogger log)
        {
            log.LogInformation($"Processing request for id: {id}");

            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    await conn.OpenAsync();
                    
                    var sql = @"
                        SELECT *
                        FROM TuTabla -- Reemplaza 'TuTabla' con el nombre real de tu tabla
                        WHERE Id = @Id
                    ";
                    
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
              
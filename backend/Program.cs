using backend.Core.AutoMapperConfig;
using backend.Core.Context; 
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

// ==================== DB Configuration ====================
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("local"));
});
// ==========================================================

// Automapper Configuration 
builder.Services.AddAutoMapper(typeof(AutoMapperConfigProfile));

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

//================================ Endpoints / Swagger configuration ==========================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

// ==================== Optional: Test DB connection endpoint ====================
// This endpoint checks if your DB is reachable and returns sample data
app.MapGet("/test-db", async (AppDbContext db) =>
{
    try
    {
        // Check if DB can connect
        bool canConnect = await db.Database.CanConnectAsync();

        // Fetch up to 5 companies (safe sample)
        var companies = await db.Companies.Take(5).ToListAsync();

        return Results.Ok(new
        {
            Success = canConnect,
            Companies = companies
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
// =============================================================================

app.UseCors(options =>
{
    options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();

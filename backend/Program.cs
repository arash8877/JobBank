// using backend.Core.AutoMapperConfig;
using backend.Core.Context; // namespace for AppDbContext
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ==================== DB Configuration ====================
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("local"));
});
// ==========================================================

// Automapper Configuration (commented out)
// builder.Services.AddAutoMapper(typeof(AutoMapperConfigProfile));

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Endpoints / Swagger configuration (Swagger commented out)
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

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

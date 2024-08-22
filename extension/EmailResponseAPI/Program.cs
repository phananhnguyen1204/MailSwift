using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS to only allow requests from your Chrome extension
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("chrome-extension://pplonlhfidkkmnjpjikojlhlkkaaagnm")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Register configuration to access appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

var app = builder.Build();

// Create a logger instance
var logger = app.Services.GetRequiredService<ILogger<Program>>();

// Log middleware order to ensure CORS is applied first
logger.LogInformation("Setting up middleware pipeline...");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Use the CORS policy globally before any other middleware
app.UseCors("CorsPolicy");

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

logger.LogInformation("Application started...");

app.Run();

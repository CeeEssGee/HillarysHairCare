using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

// Set the JSON serializer options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CUSTOMER ENDPOINTS
app.MapGet("/api/customers", (HillarysHairCareDbContext db) =>
{
    return db.Customers.ToList();
});

// STYLIST ENDPOINTS
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
    return db.Stylists.ToList();
});

// SERVICE ENDPOINTS
app.MapGet("api/services", (HillarysHairCareDbContext db) =>
{
    return db.Services.ToList();
});

// APPOINTMENT ENDPOINTS
app.MapGet("api/appointments", (HillarysHairCareDbContext db) =>
{
    return db.Appointments
        .Include(s => s.Stylist)
        .Include(c => c.Customer)
        .Include(s => s.Service)
});

app.Run();
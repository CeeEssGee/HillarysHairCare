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

// Get all customers
app.MapGet("/api/customers", (HillarysHairCareDbContext db) =>
{
    return db.Customers.ToList();
});

// Get one customer's details
app.MapGet("/api/customers/{id}", (HillarysHairCareDbContext db, int id) =>
{
    return Results.Ok(db.Customers
    .Include(c => c.Appointments)
    .ThenInclude(a => a.Services)
    );
});

// Create a new customer
app.MapPost("/api/customers", (HillarysHairCareDbContext db, Customer customer) =>
{
    db.Customers.Add(customer);
    db.SaveChanges();
    return Results.Created($"/api/customers/{customer.Id}", customer);
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
        .Include(a => a.Stylist)
        .Include(a => a.Customer)
        .Include(a => a.Services)
        .OrderBy(a => a.AppointmentTime);
});

app.Run();
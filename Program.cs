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
    return db.Customers.ToList()
    .OrderBy(c => c.Id);
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

// Get all stylists
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
    return db.Stylists.ToList()
    .OrderBy(s => s.Id);
});

// show active stylists
// app.MapGet("/api/stylists/active", (HillarysHairCareDbContext db) =>
// {
//     var activeStylists = db.Stylists
//     .Where(s => s.isActive == true).ToList();
// });
app.MapGet("/api/stylists/active", (HillarysHairCareDbContext db) =>
{
    return Results.Ok(db.Stylists.Where(s => s.isActive == true).ToList());
});

// Get one stylist's details
app.MapGet("/api/stylists/{id}", (HillarysHairCareDbContext db, int id) =>
{
    return Results.Ok(db.Stylists
    .Include(s => s.Appointments)
    .ThenInclude(a => a.Customer)
    );
});

// create new stylist
app.MapPost("/api/stylists", (HillarysHairCareDbContext db, Stylist stylist) =>
{

    db.Stylists.Add(stylist);
    db.SaveChanges();
    return Results.Created($"/api/stylists/{stylist.Id}", stylist);
});

// deactivate a stylist
app.MapPut("/api/stylists/deactivate/{id}", (HillarysHairCareDbContext db, int id) =>
{
    Stylist stylistToUpdate = db.Stylists.SingleOrDefault(stylist => stylist.Id == id);
    if (stylistToUpdate == null)
    {
        return Results.NotFound();
    }
    stylistToUpdate.isActive = false;

    db.SaveChanges();
    return Results.NoContent();
});

// activate a stylist
app.MapPut("/api/stylists/activate/{id}", (HillarysHairCareDbContext db, int id) =>
{
    Stylist stylistToUpdate = db.Stylists.SingleOrDefault(stylist => stylist.Id == id);
    if (stylistToUpdate == null)
    {
        return Results.NotFound();
    }
    stylistToUpdate.isActive = true;

    db.SaveChanges();
    return Results.NoContent();
});

// SERVICE ENDPOINTS

// get all services
app.MapGet("/api/services", (HillarysHairCareDbContext db) =>
{
    return db.Services.ToList()
    .OrderBy(s => s.Id);
});

// APPOINTMENT ENDPOINTS

// get all appointments
app.MapGet("/api/appointments", (HillarysHairCareDbContext db) =>
{
    return db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.Customer)
        .Include(a => a.Services)
        .OrderBy(a => a.AppointmentTime);
});

// add an appointment 
app.MapPost("/api/appointments", (HillarysHairCareDbContext db, Appointment appointment) =>
{

    db.Appointments.Add(appointment);
    db.SaveChanges();
    return Results.Created($"/api/appointments/{appointment.Id}", appointment);
});

// cancel an appointment
app.MapPut("/api/appointments/cancel/{id}", (HillarysHairCareDbContext db, int id) =>
{
    Appointment appointmentToCancel = db.Appointments.SingleOrDefault(appointment => appointment.Id == id);
    if (appointmentToCancel == null)
    {
        return Results.NotFound();
    }
    appointmentToCancel.isCancelled = true;

    db.SaveChanges();
    return Results.NoContent();
});

app.Run();
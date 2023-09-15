using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;

public class HillarysHairCareDbContext : DbContext
{
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Stylist> Stylists { get; set; }

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // seed data for stylists
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist {Id = 1, Name = "Stylist Abigail", isActive = true},
            new Stylist {Id = 2, Name = "Stylist Barry", isActive = true},
            new Stylist {Id = 3, Name = "Stylist Charlie", isActive = false},
            new Stylist {Id = 4, Name = "Stylist Danielle", isActive = true},
            new Stylist {Id = 5, Name = "Stylist Ellie", isActive = false},
            new Stylist {Id = 6, Name = "Stylist Freddy", isActive = true},
            new Stylist {Id = 7, Name = "Stylist Georgia", isActive = true}
        });

        // seed data for customers
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer {Id = 1, Name = "Customer Aaron", Email = "aaron@gmail.comx", PhoneNumber = "904-555-1234"},
            new Customer {Id = 2, Name = "Customer Barbara", Email = "barbara@gmail.comx", PhoneNumber = "904-555-5432"},
            new Customer {Id = 3, Name = "Customer Chris", Email = "chris@gmail.comx", PhoneNumber = "904-555-0987"},
            new Customer {Id = 4, Name = "Customer Donald", Email = "donald@gmail.comx", PhoneNumber = "904-555-7890"},
            new Customer {Id = 5, Name = "Customer Evie", Email = "evie@gmail.comx", PhoneNumber = "904-555-0000"},
            new Customer {Id = 6, Name = "Customer Frannie", Email = "frannie@gmail.comx", PhoneNumber = "904-555-1212"},
            new Customer {Id = 7, Name = "Customer Gus", Email = "gus@gmail.comx", PhoneNumber = "904-555-3322"}
        });

        // seed data for services
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service {Id = 1, Name = "Women's Haircut", Price = 45.00M},
            new Service {Id = 2, Name = "Men's Haircut", Price = 25.00M},
            new Service {Id = 3, Name = "Child's Haircut", Price = 20.00M},
            new Service {Id = 4, Name = "Color", Price = 75.00M},
            new Service {Id = 5, Name = "Beard Trim", Price = 15.00M},
            new Service {Id = 6, Name = "Perm", Price = 65.00M},
            new Service {Id = 7, Name = "Blow-Out", Price = 55.00M}
        });

        // seed data for appointmentservices
        modelBuilder.Entity("AppointmentService").HasData(new object[]
        {
            new {AppointmentsId = 1, ServicesId = 1},
            new {AppointmentsId = 1, ServicesId = 6},
            new {AppointmentsId = 2, ServicesId = 2},
            new {AppointmentsId = 2, ServicesId = 5},
            new {AppointmentsId = 3, ServicesId = 1},
            new {AppointmentsId = 4, ServicesId = 4},
            new {AppointmentsId = 5, ServicesId = 7},
            new {AppointmentsId = 6, ServicesId = 3},
            new {AppointmentsId = 7, ServicesId = 1},
            new {AppointmentsId = 7, ServicesId = 4}
        });

        // seed data for appointments
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment {Id = 1, AppointmentTime = new DateTime(2023, 09, 18, 09, 00, 00), StylistId = 1, CustomerId = 1},
            new Appointment {Id = 2, AppointmentTime = new DateTime(2023, 09, 18, 11, 00, 00), StylistId = 2, CustomerId = 2},
            new Appointment {Id = 3, AppointmentTime = new DateTime(2023, 09, 19, 10, 00, 00), StylistId = 3, CustomerId = 3},
            new Appointment {Id = 4, AppointmentTime = new DateTime(2023, 09, 19, 14, 00, 00), StylistId = 4, CustomerId = 4},
            new Appointment {Id = 5, AppointmentTime = new DateTime(2023, 09, 20, 12, 00, 00), StylistId = 5, CustomerId = 5},
            new Appointment {Id = 6, AppointmentTime = new DateTime(2023, 09, 20, 15, 00, 00), StylistId = 6, CustomerId = 6},
            new Appointment {Id = 7, AppointmentTime = new DateTime(2023, 09, 21, 11, 00, 00), StylistId = 7, CustomerId = 7}
        });
    }
}
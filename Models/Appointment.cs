using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Appointment
{
    public int Id { get; set; }
    public DateTime AppointmentTime { get; set; }
    public int StylistId { get; set; }
    public int CustomerId { get; set; }
    public Stylist Stylist { get; set; }
    public Customer Customer { get; set; }
    public List<Service> Services { get; set; }
    public bool isCancelled { get; set; }
    public decimal TotalCost
    {
        get
        {
            decimal cost = 0;
            foreach (Service service in Services)
            {
                cost += service.Price;
            }
            return cost;
        }
    }
}
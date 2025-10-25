using System;
using System.Collections.Generic;

namespace WeCareDAL.Models;

public partial class Coach
{
    public int CoachId { get; set; }

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public decimal MobileNumber { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string Speciality { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}

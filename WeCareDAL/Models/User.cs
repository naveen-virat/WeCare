using System;
using System.Collections.Generic;

namespace WeCareDAL.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public decimal MobileNumber { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string? EmailId { get; set; }

    public decimal Pincode { get; set; }

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Country { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}

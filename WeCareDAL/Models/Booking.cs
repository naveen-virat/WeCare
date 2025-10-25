using System;
using System.Collections.Generic;

namespace WeCareDAL.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public string Slot { get; set; } = null!;

    public int? UserId { get; set; }

    public int? CoachId { get; set; }

    public virtual Coach? Coach { get; set; }

    public virtual User? User { get; set; }
}

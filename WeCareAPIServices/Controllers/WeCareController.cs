using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeCareDAL;
using WeCareDAL.Models;

namespace WeCareAPIServices.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WeCareController : ControllerBase
    {
        private readonly WeCareRepository repository;
        public WeCareController()
        {
            repository = new WeCareRepository();
        }

        [HttpPost]
        public int AddUser(string name, string password, char gender, decimal mobileNumber, DateTime dateOfBirth, string emailId, decimal pincode, string city, string state, string country)
        {
            int userId;
            try
            {
                userId = repository.AddUser(name, password, gender, mobileNumber, dateOfBirth, emailId, pincode, city, state, country);
            }
            catch (Exception ex)
            {
                userId = -99;
                Console.WriteLine(ex.Message);
            }
            return userId;
        }

        [HttpPost]
        public bool UserLogin(int userId, string password)
        {
            bool status;
            try
            {
                status = repository.UserLogin(userId, password);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return status;
        }

        [HttpGet]
        public User GetUser(int userId)
        {
            return repository.GetUser(userId);
        }

        [HttpPost]
        public int AddCoach(string name, string password, char gender, decimal mobileNumber, DateTime dateOfBirth, string speciality)
        {
            int coachId;
            try
            {
                coachId = repository.AddCoach(name, password, gender, mobileNumber, dateOfBirth, speciality);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                coachId = -99;
            }
            return coachId;
        }

        [HttpPost]
        public bool CoachLogin(int coachId, string password)
        {
            bool status;
            try
            {
                status = repository.CoachLogin(coachId, password);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return status;
        }

        [HttpGet]
        public List<Coach> GetAllCoaches()
        {
            List<Coach> coaches = [];
            try
            {
                coaches = repository.GetAllCoaches();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return coaches;
        }

        [HttpGet]
        public Coach GetCoach(int coachId)
        {
            Coach coach = new();
            try
            {
                coach = repository.GetCoach(coachId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return coach;
        }

        [HttpPost]
        public int AddBooking(DateTime appointmentDate, string slot, int userId, int coachId)
        {
            int result;
            try
            {
                result = repository.AddBooking(appointmentDate, slot, userId, coachId);
            }
            catch (Exception ex)
            {
                result = -99;
                Console.WriteLine(ex.Message);
            }
            return result;
        }

        [HttpGet]
        public List<Booking> GetAllBookings()
        {
            List<Booking> bookings = new List<Booking>();
            try
            {
                bookings = repository.GetAllBookings();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return bookings;
        }

        [HttpPut]
        public int UpdateBooking(int bookingId, DateTime newAppointmentDate, string newSlot)
        {
            int status = -99;
            try
            {
                status = repository.UpdateBooking(bookingId, newAppointmentDate, newSlot);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return status;
        }

        [HttpDelete]
        public bool DeleteBooking(int bookingId)
        {
            bool status = false;
            try
            {
                status = repository.DeleteBooking(bookingId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return status;
        }
    }
}


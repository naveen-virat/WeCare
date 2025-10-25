using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Globalization;
using WeCareDAL.Models;


namespace WeCareDAL
{
    public class WeCareRepository
    {
        private WeCareDbContext context;
        public WeCareRepository() {
            context = new WeCareDbContext();
        }

        public int AddUser(string name, string password, char gender, decimal mobileNumber, DateTime dateOfBirth, string emailId, decimal pincode, string city, string state, string country)
        {
            int result;
            try
            {
                string sqlCommand = "EXEC @ReturnValue = AddUser @Name, @Password, @Gender, @MobileNumber, @DateOfBirth, @EmailId, @Pincode, @City, @State, @Country,@NewUserId";

                // Set up the parameters
                var nameParam = new SqlParameter("@Name", name);
                var passwordParam = new SqlParameter("@Password", password);
                var genderParam = new SqlParameter("@Gender", gender);
                var mobileNumberParam = new SqlParameter("@MobileNumber", mobileNumber);
                var dateOfBirthParam = new SqlParameter("@DateOfBirth", dateOfBirth);
                var emailIdParam = new SqlParameter("@EmailId", emailId);
                var pincodeParam = new SqlParameter("@Pincode", pincode);
                var cityParam = new SqlParameter("@City", city);
                var stateParam = new SqlParameter("@State", state);
                var countryParam = new SqlParameter("@Country", country);
                var userIdParam = new SqlParameter
                {
                    ParameterName = "@NewUserId",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };
                var returnValueParam = new SqlParameter
                {
                    ParameterName = "@ReturnValue",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };

                // Execute the command
                context.Database.ExecuteSqlRaw(sqlCommand, nameParam, passwordParam, genderParam, mobileNumberParam, dateOfBirthParam, emailIdParam, pincodeParam, cityParam, stateParam, countryParam, returnValueParam, userIdParam);
                result = (int)returnValueParam.Value;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result = -99;
            }
            return result;
        }

        public bool UserLogin(int userId, string password)
        {
            bool login = false;
            try
            {
                User user = (from usr in context.Users where usr.UserId == userId select usr).First<User>();
                if (user != null && user.Password == password)
                {
                    login = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return login;
        }

        public User GetUser(int userId)
        {
            User user = new();
            try
            {
                user = (from usr in context.Users where usr.UserId == userId select usr).First<User>();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return user;
        }

        public int AddCoach(string name, string password, char gender, decimal mobileNumber, DateTime dateOfBirth, string speciality)
        {
            int result;
            try
            {
                // Define the SQL command and parameters
                string sqlCommand = "EXEC @ReturnValue = AddCoach @Name, @Password, @Gender, @MobileNumber, @DateOfBirth, @Speciality,@NewCoachId";

                // Set up the parameters
                var nameParam = new SqlParameter("@Name", name);
                var passwordParam = new SqlParameter("@Password", password);
                var genderParam = new SqlParameter("@Gender", gender);
                var mobileNumberParam = new SqlParameter("@MobileNumber", mobileNumber);
                var dateOfBirthParam = new SqlParameter("@DateOfBirth", dateOfBirth);
                var specialityParam = new SqlParameter("@Speciality", speciality);
                var coachIdParam = new SqlParameter
                {
                    ParameterName = "@NewCoachId",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };
                var returnValueParam = new SqlParameter
                {
                    ParameterName = "@ReturnValue",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };

                // Execute the command
                context.Database.ExecuteSqlRaw(sqlCommand, nameParam, passwordParam, genderParam, mobileNumberParam, dateOfBirthParam, specialityParam, returnValueParam, coachIdParam);
                // Return the output parameter value
                result = (int)returnValueParam.Value;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                result = -99;
            }
            return result;
        }

        public bool CoachLogin(int coachId, string password)
        {
            bool login = false;
            try
            {
                Coach coach = (from c in context.Coaches where c.CoachId == coachId select c).First<Coach>();
                if (coach != null && coach.Password == password)
                {
                    login = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return login;
        }

        public List<Coach> GetAllCoaches()
        {
            List<Coach> coaches = [];
            try
            {
                coaches = [.. (from c in context.Coaches select c)];
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return coaches;
        }

        public Coach GetCoach(int coachId)
        {
            Coach coach = new();
            try
            {
                coach = (from c in context.Coaches where c.CoachId == coachId select c).First<Coach>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return coach;
        }

        public int AddBooking(DateTime appointmentDate, string slot, int userId, int coachId)
        {
            int result;
            try
            {
                // Define the SQL command and parameters
                string sqlCommand = "EXEC @ReturnValue = AddBooking @AppointmentDate, @Slot, @UserId, @CoachId,@NewBookingId";

                // Set up the parameters
                var appointmentDateParam = new SqlParameter("@AppointmentDate", appointmentDate);
                var slotParam = new SqlParameter("@Slot", slot);
                var userIdParam = new SqlParameter("@UserId", userId);
                var coachIdParam = new SqlParameter("@CoachId", coachId);
                var bookingIdParam = new SqlParameter
                {
                    ParameterName = "@NewBookingId",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };
                var returnValueParam = new SqlParameter
                {
                    ParameterName = "@ReturnValue",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };

                // Execute the command
                context.Database.ExecuteSqlRaw(sqlCommand, appointmentDateParam, slotParam, userIdParam, coachIdParam, returnValueParam, bookingIdParam);

                // Return the output parameter value
                result = (int)returnValueParam.Value;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                result = -99;
            }
            return result;
        }

        public List<Booking> GetAllBookings() {
            List<Booking> bookings = new List<Booking>();
            try
            {
                bookings = [.. (from b in context.Bookings select b)];
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return bookings;
        }

        public int UpdateBooking(int bookingId, DateTime newAppointmentDate, string newSlot)
        {
            int status = -99;
            try
            {
                // Define the SQL command and parameters
                string sqlCommand = "EXEC @ReturnStatus = UpdateBooking @BookingId, @NewAppointmentDate, @NewSlot";

                // Set up the parameters
                var bookingIdParam = new SqlParameter("@BookingId", bookingId);
                var newAppointmentDateParam = new SqlParameter("@NewAppointmentDate", newAppointmentDate);
                var newSlotParam = new SqlParameter("@NewSlot", newSlot);
                var returnStatusParam = new SqlParameter
                {
                    ParameterName = "@ReturnStatus",
                    SqlDbType = SqlDbType.Int,
                    Direction = ParameterDirection.Output
                };

                // Execute the command
                context.Database.ExecuteSqlRaw(sqlCommand, bookingIdParam, newAppointmentDateParam, newSlotParam, returnStatusParam);

                // Return the output parameter value indicating the status of the operation
                status = (int)returnStatusParam.Value;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return status;
        }

        public bool DeleteBooking(int bookingId)
        {
            try
            {
                // Find the booking by BookingId
                var booking = context.Bookings.Find(bookingId);

                if (booking != null)
                {
                    // Remove the booking from the DbSet
                    context.Bookings.Remove(booking);

                    // Save changes to the database
                    context.SaveChanges();

                    return true;
                }
            }
            catch(Exception ex) { 
                Console.WriteLine(ex.Message);
            }
            // If no booking found, return false
            return false;
        }
    }
}

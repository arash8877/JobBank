

namespace backend.Core.Entities
{

    public class Applicant : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public string ResumeUrl { get; set; }

        // Relations
        public long JobId { get; set; }
        public Job Job { get; set; }
    }
        
}
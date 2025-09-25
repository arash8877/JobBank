using backend.Core.Enums;

namespace backend.Core.Dtos.Job
{
    public class JobCreateDto
    {
        public string Title { get; set; }
        public JobLevel Size { get; set; } 
        public long CompanyId { get; set; }
    }
}
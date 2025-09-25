using AutoMapper;
using backend.Core.Entities;
using backend.Core.Dtos.Company;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            // Company
            CreateMap<CompanyCreateDto, Company>();
            CreateMap<Company, CompanyGetDto>();

            // Job

            // Applicant
        }
    }
}


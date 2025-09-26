using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Applicant;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ApplicantController : ControllerBase
    {
        private AppDbContext _context { get; }
        private IMapper _mapper { get; }


        public ApplicantController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //----------------- CRUD ------------------
        // Create
        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateApplicant([FromForm] ApplicantCreateDto dto, IFormFile pdfFile)
        {
            var faiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeTypes = "application/pdf";

            if (pdfFile.Length > faiveMegaByte || pdfFile.ContentType != pdfMimeTypes)
            {
                return BadRequest("File is too large or not a valid PDF.");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdfs", resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newApplicant = _mapper.Map<Applicant>(dto);
            newApplicant.ResumeUrl = resumeUrl;

            await _context.Applicants.AddAsync(newApplicant);
            await _context.SaveChangesAsync();

            return Ok("Applicant saved successfully");

        }

        // Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<ApplicantGetDto>>> GetApplicants()
        {
            var applicants = await _context.Applicants
                .Include(a => a.Job)
                .ToListAsync();

            var applicantDtos = _mapper.Map<IEnumerable<ApplicantGetDto>>(applicants);

            return Ok(applicantDtos);
        }

        // Update

        // Delete


    }

}
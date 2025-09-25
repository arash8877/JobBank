using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Job;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class JobController : ControllerBase
    {
        private AppDbContext _context { get; }
        private IMapper _mapper { get; }


        public JobController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //------------- CRUD --------------
        // Create
        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
        {
            var newJob = _mapper.Map<Job>(dto);
            await _context.Jobs.AddAsync(newJob);
            await _context.SaveChangesAsync();

            return Ok("Job created successfully");
        }


        // Read
        [HttpGet]
        [Route("get")]
        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var Jobs = await _context.Jobs.Include(job=> job.Company).ToListAsync();
            var JobsDto = _mapper.Map<IEnumerable<JobGetDto>>(Jobs);

            return Ok(JobsDto);
        }

        // Update

        // Delete


    }

}
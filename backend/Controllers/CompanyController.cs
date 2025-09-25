using backend.Core.Context;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CompanyController : ControllerBase
    {
        private AppDbContext _context { get; }
        public CompanyController(AppDbContext context)
        {
            _context = context;
        }

        //------------- CRUD --------------
        // Create
        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateCompany([FromBody] Company company)
        {
            if (company == null)
            {
                return BadRequest("Company data is null.");
            }

            try
            {
                await _context.Companies.AddAsync(company);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCompanyById), new { id = company.Id }, company);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // Read

        // Update

        // Delete


    }

}
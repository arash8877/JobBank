using backend.Core.Context;
using backend.Core.Dtos.Company;
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

        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
         
        }


        // Read

        // Update

        // Delete


    }

}
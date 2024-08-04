using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : BaseApiController
    {
        private readonly StoreContext _context;
        public DocumentsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Document>>> GetDocuments() {
            return await _context.Documents.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id) {
            var product = await _context.Documents.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}  
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DocumentContainerController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public DocumentContainerController(StoreContext context)
        {
            _context = context;
        }
    
        //GET DOCUMENTS FROM A CONTAINER REQUEST
        [HttpGet]
        public async Task<ActionResult<DocumentContainerDto>> GetDocumentContainer() {
           if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj == null) {
                return BadRequest("User ID not found.");
            }

            string userId = userIdObj.ToString();
            if (string.IsNullOrWhiteSpace(userId)) {
                return BadRequest("Invalid User ID.");
            }
            var userDocuments = await RetrieveDocumentContainer(userId);

            if (userDocuments == null)
            {
                return NotFound();
            }
            return MapDocContainerToDto(userDocuments);
        }

        //DELETE DOCUMENT REQUEST
        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> RemoveDocument(int id) {
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj == null) {
                    return BadRequest("User ID not found.");
                }

            string userId = userIdObj.ToString();
            if (string.IsNullOrWhiteSpace(userId)) {
                return BadRequest("Invalid User ID.");
            }


            var userDocuments = await RetrieveDocumentContainer(userId);

            // Fetch the document from the database
            var document = await _context.Documents.FindAsync(id);
            if (document == null) return NotFound("Document not found");
            userDocuments.RemoveDocument(document);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Problem removing document"});
        }

        //UPDATE DOCUMENT REQUEST
        [HttpPut("update/{id}")]
        public async Task<ActionResult<DocumentDto>> UpdateDocument(int id, [FromBody] DocumentDto documentDto)
        {
            // Check if the document exists
            var document = await _context.Documents.FindAsync(id);
            if (document == null) return NotFound("Document not found");

            // Update the document's properties
            document.Title = documentDto.Title;
            document.Description = documentDto.Description;
            document.UpdatedAt = DateTime.UtcNow; // Update the updatedAt timestamp

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(document);

            return BadRequest(new ProblemDetails { Title = "Problem updating document" });
        }


        //CREATE DOCUMENTS REQUEST
        [HttpPost("create")]
        public async Task<ActionResult<DocumentDto>> CreateDocument([FromBody] DocumentDto documentDto)
        {
            if (!HttpContext.Items.TryGetValue("UserId", out var userIdObj) || userIdObj == null) {
                return BadRequest("User ID not found.");
            }

            string userId = userIdObj.ToString();
            if (string.IsNullOrWhiteSpace(userId)) {
                return BadRequest("Invalid User ID.");
            }


            var documentContainer = await RetrieveDocumentContainer(userId);
            if (documentContainer == null)
            {
                documentContainer = CreateDocumentContainer(userId);
                _context.DocumentContainer.Add(documentContainer);
                await _context.SaveChangesAsync();
            }

            var newDocument = new Document
            {
                UserId = userId,
                Title = documentDto.Title,
                Description = documentDto.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                DocumentContainerId = documentContainer.Id
            };

            _context.Documents.Add(newDocument);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(newDocument);

            return BadRequest(new ProblemDetails { Title = "Problem creating document" });
        }


        //-------------------------------------------------------------------------
    
        private DocumentContainer CreateDocumentContainer(string userId)
        {
            var newContainer = new DocumentContainer { UserId = userId };
            _context.DocumentContainer.Add(newContainer);
            return newContainer;
        }


        private async Task<DocumentContainer> RetrieveDocumentContainer(string userId)
        {
            return await _context.DocumentContainer
            .Include(dc => dc.UserDocuments)
            .FirstOrDefaultAsync(dc => dc.UserId == userId);
        }

        private DocumentContainerDto MapDocContainerToDto(DocumentContainer userDocuments)
        {
            return new DocumentContainerDto
            {
                Id = userDocuments.Id,
                UserId = userDocuments.UserId,
                UserDocuments = userDocuments.UserDocuments.Select(doc => new DocumentDto
                {
                    Id = doc.Id,
                    Title = doc.Title,
                    Description = doc.Description,
                    CreatedAt = doc.CreatedAt,
                    UpdatedAt = doc.UpdatedAt
                }).ToList()
            };
        }


    }
}
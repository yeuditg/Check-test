using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class SubjectController : ControllerBase
{
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService subjectService)
    {
        _subjectService = subjectService;
    }

    // POST: api/subject
    [HttpPost]
    public async Task<ActionResult<Subject>> AddSubject([FromBody] Subject newSubject)
    {
        if (newSubject == null)
        {
            return BadRequest("Subject cannot be null");
        }

        if (string.IsNullOrWhiteSpace(newSubject.Name))
        {
            return BadRequest("Subject name is required");
        }

        if (string.IsNullOrWhiteSpace(newSubject.Description))
        {
            return BadRequest("Subject description is required");
        }

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        newSubject.userId = int.Parse(userIdClaim.Value); 

        await _subjectService.AddSubject(newSubject);
        return CreatedAtAction(nameof(GetSubjectById), new { id = newSubject.Id }, newSubject);
    }


    // POST: api/subject/{subjectId}/classes
    [HttpPost("{subjectId}/classes")]
    public async Task<ActionResult> AddClassToSubject(int subjectId, [FromBody] Classes newClass)
    {
        if (newClass == null)
        {
            return BadRequest("Class cannot be null");
        }

        newClass.SubjectId = subjectId; // קשר עם מקצוע
        await _subjectService.AddClassToSubject(subjectId, newClass);
        return NoContent();
    }

    // GET: api/subject
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        int userId = int.Parse(userIdClaim.Value);

        // שאילתת המקצועות של המשתמש
        var subjects = await _subjectService.GetSubjectsByUserId(userId);

        return Ok(subjects);
    }


    // GET: api/subject/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Subject>> GetSubjectById(int id)
    {
        var subjectItem = await _subjectService.GetSubjectById(id);
        if (subjectItem == null)
        {
            return NotFound();
        }
        return Ok(subjectItem);
    }

    // PUT: api/subject/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubject(int id, Subject updatedSubject)
    {
        if (id != updatedSubject.Id)
        {
            return BadRequest();
        }

        await _subjectService.UpdateSubject(updatedSubject);
        return NoContent();
    }

    // DELETE: api/subject/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubject(int id)
    {
        var subjectToDelete = await _subjectService.GetSubjectById(id);
        if (subjectToDelete == null)
        {
            return NotFound();
        }

        await _subjectService.DeleteSubject(id);
        return NoContent();
    }
    [HttpGet("{subjectId}/classes")]
    public async Task<IActionResult> GetClassesBySubjectId(int subjectId)
    {
        var classes = await _subjectService.GetClassesBySubjectId(subjectId);

        if (classes == null || classes.Count() == 0)
        {
            return Ok(new List<Classes>());
        }

        return Ok(classes);
    }


}

using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ClassController : ControllerBase
{
    private readonly IClassService _classService;

    public ClassController(IClassService classService)
    {
        _classService = classService;
    }

    // GET: api/class
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Classes>>> GetClasses()
    {
        return Ok(await _classService.GetAllClasses());
    }

    // GET: api/class/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Classes>> GetClassById(int id)
    {
        var classItem = await _classService.GetClassById(id);
        if (classItem == null)
        {
            return NotFound();
        }
        return Ok(classItem);
    }

    // POST: api/subject/{subjectId}/classes
    [HttpPost("{subjectId}/classes")]
    public async Task<ActionResult> AddClassToSubject(int subjectId, [FromBody] Classes newClass)
    {
        if (newClass == null)
        {
            return BadRequest("Class cannot be null");
        }

        newClass.SubjectId = subjectId; 
        await _classService.AddClassToSubject(subjectId, newClass);
        return NoContent();
    }

    // PUT: api/class/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClass(int id, Classes updatedClass)
    {
        if (id != updatedClass.Id)
        {
            return BadRequest();
        }

        await _classService.UpdateClass(updatedClass);
        return NoContent();
    }

    // DELETE: api/class/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClass(int id)
    {
        await _classService.DeleteClass(id);
        return NoContent();
    }
}

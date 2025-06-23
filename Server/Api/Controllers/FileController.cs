//using Core.IServices;
//using Core.Models;
//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class FileController : ControllerBase
//    {
//        private readonly IFileService _fileService;
//        public FileController(IFileService fileService)
//        {
//            this._fileService = fileService;
//        }
    
//        // GET: api/file/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Core.Models.File>> GetFile(int id)
//        {
//            var file = await _fileService.GetFileByIdAsync(id);
//            if (file == null)
//            {
//                return NotFound();
//            }
//            return Ok(file);
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Core.Models.File>>> GetFiles()
//        {
//            var files = await _fileService.GetAllFilesAsync();
//            return Ok(files);
//        }

//        // POST: api/file
//        [HttpPost]
//        public async Task<ActionResult<Core.Models.File>> CreateFile(Core.Models.File newFile)
//        {
//            var createdFile = await _fileService.CreateFileAsync(newFile);
//            return CreatedAtAction(nameof(GetFile), new { id = createdFile.Id }, createdFile);
//        }
      
//        // PUT: api/file/{id}
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateFile(int id, Core.Models.File updatedFile)
//        {
//            if (id != updatedFile.Id)
//            {
//                return BadRequest();
//            }

//            var result = await _fileService.UpdateFileAsync(updatedFile);
//            if (!result)
//            {
//                return NotFound();
//            }

//            return NoContent();
//        }

//        // DELETE: api/file/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteFile(int id)
//        {
//            var result = await _fileService.DeleteFileAsync(id);
//            if (!result)
//            {
//                return NotFound();
//            }

//            return NoContent();
//        }
//    }
//}
using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            this._fileService = fileService;
        }
        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<IEnumerable<Core.Models.File>>> GetFilesForUserID(int userId)
        {
            var files = await _fileService.GetFilesByUserIdAsync(userId);
            if (files == null || !files.Any())
            {
                return NotFound();
            }
            return Ok(files);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Core.Models.File>> GetFile(int id)
        {
            var file = await _fileService.GetFileByIdAsync(id);
            if (file == null)
            {
                return NotFound();
            }
            return Ok(file);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Core.Models.File>>> GetFiles()
        {
            var files = await _fileService.GetAllFilesAsync();
            return Ok(files);
        }

        [HttpPost]
        public async Task<ActionResult<Core.Models.File>> CreateFile([FromBody]Core.Models.File newFile)
        {
            var createdFile = await _fileService.CreateFileAsync(newFile);
            return CreatedAtAction(nameof(GetFile), new { id = createdFile.Id }, createdFile);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, Core.Models.File updatedFile)
        {
            if (id != updatedFile.Id)
            {
                return BadRequest();
            }

            var result = await _fileService.UpdateFileAsync(updatedFile);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var result = await _fileService.DeleteFileAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

using Api.PostModel;
using AutoMapper;
using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using File = Core.Models.File;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly IMapper _mapper;

        public FolderController(IFolderService folderService, IMapper mapper)
        {
            _folderService = folderService;
            _mapper = mapper;
        }
        [Authorize]
        [HttpGet("by-user")]
        public async Task<IActionResult> GetById()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            int userId = 0;
            if (userIdClaim != null)
            {
                userId = int.Parse(userIdClaim.Value);
            }

            var folders = await _folderService.GetFoldersByUserIdAsync(userId);

            if (folders == null || !folders.Any())
            {
                return NotFound();
            }
            return Ok(folders);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var folders = await _folderService.GetAllFoldersAsync();
            return Ok(folders);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(FolderPostModel folderPostModel)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            int userId = 0;
            if (userIdClaim != null)
            {
                userId = int.Parse(userIdClaim.Value);
                Console.WriteLine(userId);
            }
            var folder = _mapper.Map<Folder>(folderPostModel);
            folder.userId = userId;
            folder.Classes = new List<Folder>();
            folder.test = new List<File>();

            await _folderService.CreateFolderAsync(folder, userId);
            return CreatedAtAction(nameof(Get), new { id = folder.Id }, folder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, FolderPostModel updatedFolder)
        {
            //if (id != updatedFolder.Id)
            //{
            //    return BadRequest();
            //}
            Folder newf = new Folder
            {
                Name = updatedFolder.Name,
                Description = updatedFolder.Description,
                userId = id,
                Classes = new List<Folder>(),
                test = new List<File>()
            };
            var result = await _folderService.UpdateFolderAsync(newf);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _folderService.DeleteFolderAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}



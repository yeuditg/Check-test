using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/upload")]
public class UploadController : ControllerBase
{
    private readonly IAmazonS3 _s3Client;

    public UploadController(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    [HttpGet("presigned-url")]
    public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string contentType)
    {
        var allowedContentTypes = new string[]
        {
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain",
            "application/zip",
            "application/x-rar-compressed"
        };
        if (!allowedContentTypes.Contains(contentType))
        {
            return BadRequest("Invalid content type.");
        }
        var request = new GetPreSignedUrlRequest
        {
            BucketName = "checkthetest.testpnoren",
            Key = fileName,
            Verb = HttpVerb.PUT,
            Expires = DateTime.UtcNow.AddMinutes(5),
            ContentType = contentType
        };
        string url = _s3Client.GetPreSignedURL(request);
        return Ok(new { url });
    }
}

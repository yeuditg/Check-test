using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Amazon.S3;
    using Amazon.S3.Model;
    using Core.IServices;

    namespace Service
        {
            public class DownloadService : IDownloadService
            {
                private readonly IAmazonS3 _s3Client;

                public DownloadService(IAmazonS3 s3Client)
                {
                    _s3Client = s3Client;
                }

                public async Task<string> GetDownloadUrlAsync(string fileName)
                {
                    var request = new GetPreSignedUrlRequest
                    {
                        BucketName = "checkthetest.testpnoren",
                        Key = fileName,
                        Verb = HttpVerb.GET,
                        Expires = DateTime.UtcNow.AddMinutes(60),
                    };
                var res = _s3Client.GetPreSignedURL(request);
                return res;
                }
            }
        }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
namespace Core.IServices
{
        public interface IOcrService
        {
            Task<JsonDocument> ExtractTextAsync(string base64Image);
        }
}

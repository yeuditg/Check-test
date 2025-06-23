
using AutoMapper;
using Api.PostModel;
using Core.Models;
namespace Api
{

    public class MappingPostProfile : Profile
    {
        public MappingPostProfile()
        {
            CreateMap<UserPostModel,User>().ReverseMap();
            CreateMap<FolderPostModel,Folder>().ReverseMap();
        }
    }
 
}

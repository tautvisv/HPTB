using System.IO;

namespace FileProcessingLib
{
    public interface IStreamSaver
    {
        string SaveAsMinified(string rootPath, string fileName);
        string Save(Stream file, string fileName);
    }
}

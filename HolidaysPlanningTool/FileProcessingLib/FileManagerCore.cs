using System;
using System.IO;
using ImageProcessor;
using System.Drawing;
using ImageProcessor.Imaging.Formats;

namespace FileProcessingLib
{
    public class FileManagerCore
    {
        private readonly string Root;
        public FileManagerCore(string root)
        {
            if (string.IsNullOrEmpty(root))
                throw new NullReferenceException($"{nameof(root)} cannot be empty or null");
            Root = root;
        }
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        public void SaveUserImage(Stream image, string imagePath)
        {
            byte[] photoBytes = ReadFully(image);
            // Format is automatically detected though can be changed.
            ISupportedImageFormat format = new JpegFormat { Quality = 70 };
            Size size = new Size(150, 0);
            using (MemoryStream inStream = new MemoryStream(photoBytes))
            {
                using (MemoryStream outStream = new MemoryStream())
                {
                    // Initialize the ImageFactory using the overload to preserve EXIF metadata.
                    using (ImageFactory imageFactory = new ImageFactory(preserveExifData: true))
                    {
                        // Load, resize, set the format and quality and save an image.
                        imageFactory.Load(inStream)
                                    .Resize(size)
                                    .Format(format)
                                    .Save(outStream);
                    }
                    using (FileStream file = new FileStream(Root+"test.jpg", FileMode.Open, FileAccess.Read))
                    {
                        byte[] bytes = new byte[file.Length];
                        file.Read(bytes, 0, (int)file.Length);
                        outStream.Write(bytes, 0, (int)file.Length);
                    }
                }
            }
            
        }
        //public void UploadUserPhoto(Stream file)
        //{
        //    Image image = Image.FromStream(file, true, true);
        //    var newImage = new Bitmap(1024, 768);
        //    using (var g = Graphics.FromImage(newImage))
        //    {
        //        g.DrawImage(image, 0, 0, 1024, 768);
        //    }
        //}
    }
}

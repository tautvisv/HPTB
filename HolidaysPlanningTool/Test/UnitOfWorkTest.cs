using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Test
{
    [TestClass]
    public class UnitOfWorkTest
    {
        [TestMethod]
        public void Dispose_null_as_dbContext()
        {
            var uow = new UnitOfWork.UnitOfWork(null);
            uow.Dispose();
        }

    }
}
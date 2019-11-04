using Microsoft.VisualStudio.TestTools.UnitTesting;
using randomfilm_backend.Models;

namespace randomfilm_backend.Tests
{
    [TestClass]
    public class FimsDbContextTests
    {
        /// <summary>
        /// Тест-кейс проверяющий проходит ли подключение к БД
        /// </summary>
        [TestMethod]
        public void TestDBConnection()
        {
            bool result;
            RandomFilmDBContext db = new RandomFilmDBContext();
            if (db.Database.CanConnect() || db.Roles.Local.Count > 0)
                result = true;
            else
                result = false;
            Assert.IsTrue(result);
        }
    }
}

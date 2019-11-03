using Microsoft.VisualStudio.TestTools.UnitTesting;
using randomfilm_backend.Models;

namespace randomfilm_backend.Tests
{
    [TestClass]
    public class AccountDbContextTests
    {
        /// <summary>
        /// Тест-кейс проверяющий проходит ли подключение к БД аккаунтов
        /// </summary>
        [TestMethod]
        public void TestAccountDBConnection()
        {
            bool result;
            AccountsDBContext db = new AccountsDBContext();
            if (db.Database.CanConnect())
                result = true;
            else
                result = false;
            Assert.IsTrue(result);
        }
    }
}

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore;

using randomfilm_backend.Models;
using randomfilm_backend.Controllers;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace randomfilm_backend.Tests
{
    [TestClass]
    public class AuthControllerTests
    {
        RandomFilmDBContext db;
        public AuthControllerTests()
        {
            db = new RandomFilmDBContext();
        }
        [TestMethod]
        public void GetIdentityTest()
        {
            ClaimsIdentity result = null;
            string username = "Anton";
            string password = "1234";
            Account person = db.Accounts.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, db.Roles.First(x => x.Id == person.RoleId).Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                result = claimsIdentity;
            }
            else
            {
                Assert.Fail("Person is null");
            }

            // если пользователя не найдено
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void GetTokenTest()
        {
            var username = "Anton";//Login;
            var password = "1234";//Password;

            ClaimsIdentity identity = GetIdentity(username, password);
            if (identity == null)
            {
                Assert.Fail("Null Identity");
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("mysupersecret_secretkey!123")), SecurityAlgorithms.HmacSha256));
            string jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

            Assert.IsNotNull(jwtToken, String.Format("Token is: {0}",jwtToken));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            Account person = db.Accounts.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role.Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        [TestMethod]
        public void IsThereAnton1234InDb()
        {
            string username = "Anton";
            string password = "1234";
            Account person = db.Accounts.FirstOrDefault(x => x.Login == username && x.Password == password);
            Assert.IsNotNull(person);
        }
    }
}

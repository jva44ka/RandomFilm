using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using randomfilm_backend;
using randomfilm_backend.Models;

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AccountsDBContext _context;

        public AuthController(AccountsDBContext context)
        {
            _context = context;
        }


        // POST: api/Auth
        /*[HttpPost]
        public ActionResult<string> Post(Account account)
        {
            var username = account.Login;
            var password = account.Password;

            ClaimsIdentity identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest();
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            string jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

            return jwtToken;
        }*/

        // POST: api/Auth
        [HttpPost("token")]
        public ActionResult<string> Post([FromBody] Account account)
        {
            //Account account = JsonDeserializer.AccountJsonDeserializer(body);
            var username = account.Login;
            var password = account.Password;

            ClaimsIdentity identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest();
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            string jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(jwtToken);
        }

        public ClaimsIdentity GetIdentity(string username, string password)
        {
            Account person = _context.Accounts.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login)//,
#warning Решить проблему с person.Role == null
                    //new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role.Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}

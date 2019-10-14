using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace randomfilm_backend.Models
{
    public class Account
    {
        public string Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public Account(string id, string login, string password, string role = "")
        {
            this.Id = id;
            this.Login = login;
            this.Password = password;
            if (role != "")
            {
                this.Role = role;
            }
            else
            {
                this.Role = "user";
            }
        }
    }
}

using System;
using System.Collections.Generic;

namespace randomfilm_backend
{
    public partial class Account
    {
        public string Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string RoleId { get; set; }

        public virtual Role Role { get; set; }

        public Account()
        { }

        /*public Account(string id, string login, string password, string role = "")
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
        }*/
    }
}

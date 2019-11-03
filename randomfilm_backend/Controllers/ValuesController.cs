﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var nameIdentifier = this.HttpContext.User.Claims
            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            return new string[] { nameIdentifier?.Value, "value1", "value2" };
        }

        // GET api/values/5
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return String.Format("value is {0}", id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

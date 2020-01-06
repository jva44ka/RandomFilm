using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

using randomfilm_backend.Models;
using Microsoft.AspNetCore.Cors;

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class FilmsController : ControllerBase
    {
        private readonly RandomFilmDBContext db;

        public FilmsController(RandomFilmDBContext context)
        {
            db = context;
        }

        // GET: api/Films
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Film>>> GetFilms()
        {
            return FilmUtility.GetPreparedFilms(await db.Films.ToListAsync()).OrderBy(x => x.Title).ToArray();
        }

        // GET: api/Films/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Film>> GetFilm(int id)
        {
            Models.Film film = await db.Films.FirstOrDefaultAsync((findingFilm) => findingFilm.Id == id);

            if (film == null)
            {
                return NotFound();//NotFound();
            }

            return FilmUtility.GetPreparedFilm(film);
        }

        // GET: api/Films/Random
        [HttpGet("Random")]
        public async Task<ActionResult<Models.Film>> GetRandomFilm()
        {
            Film randomFilm = await FilmUtility.GetRandomFilmAsync();
            return FilmUtility.GetPreparedFilm(randomFilm);
        }

        [HttpGet("SpecificityFilm")]
        [Authorize]
        public async Task<ActionResult<Models.Film>> GetSpecificityFilm()
        {
            return await FilmUtility.GetSpecificityFilmAsync(db.Accounts.FirstOrDefault(x => x.Login == this.HttpContext.User.Identity.Name));
        }

        // PUT: api/Films/5
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutFilm(int id, Models.Film film)
        {
            if (id != film.Id)
            {
                return BadRequest();
            }

            db.Entry(film).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FilmExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Films
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Models.Film>> PostFilm([FromBody] Models.Film film)
        {
            db.Films.Add(film);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FilmExists(film.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(film);
        }

        // DELETE: api/Films/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Models.Film>> DeleteFilm(int id)
        {
            var film = await db.Films.FirstOrDefaultAsync((findingFilm) => findingFilm.Id == id);
            if (film == null)
            {
                return NotFound();
            }
            db.Films.Remove(film);
            await db.SaveChangesAsync();

            return film;
        }

        private bool FilmExists(int id)
        {
            return db.Films.Any(e => e.Id == id);
        }
    }
}

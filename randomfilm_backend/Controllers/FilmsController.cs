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

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        private readonly FilmsDBContext _context;

        public FilmsController(FilmsDBContext context)
        {
            _context = context;
        }

        // GET: api/Films
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilms()
        {
            return await _context.Films.ToListAsync();
        }

        // GET: api/Films/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Film>> GetFilm(int id)
        {
            Film film = await _context.Films.FirstOrDefaultAsync((findingFilm) => findingFilm.Id == id);

            if (film == null)
            {
                return NotFound();//NotFound();
            }

            return film;
        }

        // GET: api/Films/Random
        [HttpGet("Random")]
        public async Task<ActionResult<Film>> GetRandomFilm()
        {
            return await FilmUtility.GetRandomFilmAsync(_context.Films);
        }

        // PUT: api/Films/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilm(int id, Film film)
        {
            if (id != film.Id)
            {
                return BadRequest();
            }

            _context.Entry(film).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

        //// POST: api/Films
        //[HttpPost]
        //public async Task<ActionResult<Film>> PostFilm([FromBody]Film film)
        //{
        //    _context.Films.Add(film);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (FilmExists(film.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return Ok(film);
        //    //return CreatedAtAction("GetFilm", new { id = film.Id }, film);
        //

        // POST: api/Films
        [HttpPost]
        public async Task<ActionResult<Film>> PostFilm([FromBody]string stringFilm)
        {
            Film film = FilmUtility.GetFilmFromJson(stringFilm);
            _context.Films.Add(film);
            try
            {
                await _context.SaveChangesAsync();
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
            //return CreatedAtAction("GetFilm", new { id = film.Id }, film);
        }

        [HttpPost("SpecificityFilm")]
        [Authorize]
        public async Task<ActionResult<Film>> SpecificityFilm([FromBody]string stringFilm)
        {
            Film film = FilmUtility.GetFilmFromJson(stringFilm);
            _context.Films.Add(film);
            try
            {
                await _context.SaveChangesAsync();
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
            //return CreatedAtAction("GetFilm", new { id = film.Id }, film);
        }


        // DELETE: api/Films/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Film>> DeleteFilm(int id)
        {
            var film = await _context.Films.FirstOrDefaultAsync((findingFilm) => findingFilm.Id == id);//FindAsync(id);
            if (film == null)
            {
                return NotFound();
            }
            _context.Films.Remove(film);
            await _context.SaveChangesAsync();

            return film;
        }

        private bool FilmExists(int id)
        {
            return _context.Films.Any(e => e.Id == id);
        }
    }
}

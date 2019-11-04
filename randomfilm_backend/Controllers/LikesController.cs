using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using randomfilm_backend.Models;

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly RandomFilmDBContext db;

        public LikesController(RandomFilmDBContext context)
        {
            db = context;
        }

        // GET: api/Likes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Like>>> GetLikes()
        {
            return await db.Likes.ToListAsync();
        }

        // GET: api/Likes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Like>> GetLike(int id)
        {
            var like = await db.Likes.FindAsync(id);

            if (like == null)
            {
                return NotFound();
            }

            return like;
        }

        // GET: api/Likes/ByFilm/5
        [HttpGet("ByFilm/{id}")]
        [Authorize]
        public async Task<ActionResult<Like>> GetLikeByFilm(int id)
        {
            int accountId = db.Accounts.
                FirstOrDefaultAsync(x => x.Login == this.HttpContext.User.Identity.Name).Id;
            var like = await db.Likes.
                FirstOrDefaultAsync((x) => x.FilmId == id && x.AccountId == accountId) ;

            return like;
        }

        // POST: api/Likes
        [HttpPost]
        public async Task<ActionResult<Like>> PostLike(Like like)
        {
            db.Likes.Add(like);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetLike", new { id = like.Id }, like);
        }

        // DELETE: api/Likes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Like>> DeleteLike(int id)
        {
            var like = await db.Likes.FindAsync(id);
            if (like == null)
            {
                return NotFound();
            }

            db.Likes.Remove(like);
            await db.SaveChangesAsync();

            return like;
        }

        private bool LikeExists(int id)
        {
            return db.Likes.Any(e => e.Id == id);
        }
    }
}

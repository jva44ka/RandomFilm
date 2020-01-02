using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using randomfilm_backend.Models;

namespace randomfilm_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
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
                FirstOrDefaultAsync((x) => x.FilmId == id && x.AccountId == accountId);

            return like;
        }

        // POST: api/Likes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Like>> PostLike(Like requestLike)
        {
            //Лайк уже существует?
            if (db.Likes.FirstOrDefault(x => (x.FilmId == requestLike.FilmId) && 
                (x.AccountId == db.Accounts.FirstOrDefault(y => y.Login == HttpContext.User.Identity.Name).Id)) != null)
            {
                //Пользователь пытается поставить существующий лайк
                return Conflict();
            }

            Like like = new Like
            {
                FilmId = requestLike.FilmId,
                AccountId = db.Accounts.FirstOrDefault(x => x.Login == HttpContext.User.Identity.Name).Id,
                LikeOrDislike = requestLike.LikeOrDislike,
            };
            db.Likes.Add(like);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetLike", new { id = like.Id }, like);
        }

        // DELETE: api/Likes/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Like>> DeleteLike(int id)
        {
            var like = await db.Likes.FindAsync(id);
            if (like == null)
            {
                return NotFound();
            }

            if (HttpContext.User.Identity.Name != like.Account.Login)
            {
                //Пользователь пытается удалить не свой лайк
                return Conflict();
            }

            db.Likes.Remove(like);
            await db.SaveChangesAsync();

            return Ok();
        }

        private bool LikeExists(int id)
        {
            return db.Likes.Any(e => e.Id == id);
        }
    }
}

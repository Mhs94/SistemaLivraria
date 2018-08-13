using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LivrariaDomain;
using LivrariaRepository;

namespace Livraria.Controllers
{
    public class LivroController : ApiController
    {
        private LivrariaData db = new LivrariaData();

        // GET: api/Livro
        public IQueryable<Livro> GetLivro()
        {
            //return db.Livro;

            return db.Livro.OrderBy(e => e.titulo);
        }

        // GET: api/Livro/5

        [ResponseType(typeof(Livro))]
        public IQueryable<Livro> GetLivro(string id)
        {
            int resul = -1;
            int.TryParse(id, out resul);
            if ((!id.Equals("0")) && resul == 0)
            {
                return db.Livro.Where(e => e.titulo.Contains(id));
            }

            var livro = db.Livro.Where(e => e.cod.Equals(resul));
            if (livro == null)
            {
                return null;
            }

            return livro;
        }

        // PUT: api/Livro/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLivro(int id, Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livro.cod)
            {
                return BadRequest();
            }

            db.Entry(livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Livro
        [ResponseType(typeof(Livro))]
        public IHttpActionResult PostLivro(Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Livro.Add(livro);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livro.cod }, livro);
        }

        // DELETE: api/Livro/5
        [ResponseType(typeof(Livro))]
        public IHttpActionResult DeleteLivro(int id)
        {
            Livro livro = db.Livro.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            db.Livro.Remove(livro);
            db.SaveChanges();

            return Ok(livro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivroExists(int id)
        {
            return db.Livro.Count(e => e.cod == id) > 0;
        }
    }
}
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
using LibraryApp;

namespace LibraryApp.Controllers
{
    public class AuthorsController : ApiController
    {
        private libraryAppEntities db = new libraryAppEntities();

        // GET: api/Authors
        public IQueryable<author> Getauthors()
        {
            return db.authors;
        }

        public IQueryable<author> find(string filter)
        {
            if (filter != null)
            {
                if (!filter.Equals(""))
                {
                    return db.authors.Where(b => b.name.Contains(filter));
                }
            }

            return db.authors;
        }

        // GET: api/Authors/5
        [ResponseType(typeof(author))]
        public IHttpActionResult Getauthor(int id)
        {
            author author = db.authors.Find(id);
            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        // PUT: api/Authors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putauthor(int id, author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author.id)
            {
                return BadRequest();
            }

            db.Entry(author).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!authorExists(id))
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

        // POST: api/Authors
        [ResponseType(typeof(author))]
        public IHttpActionResult Postauthor(author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.authors.Add(author);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = author.id }, author);
        }

        // DELETE: api/Authors/5
        [ResponseType(typeof(author))]
        public IHttpActionResult Deleteauthor(int id)
        {
            author author = db.authors.Find(id);
            if (author == null)
            {
                return NotFound();
            }
            foreach (var item in author.books)
            {
                db.books.Remove(item);
            }
            db.authors.Remove(author);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool authorExists(int id)
        {
            return db.authors.Count(e => e.id == id) > 0;
        }
    }
}
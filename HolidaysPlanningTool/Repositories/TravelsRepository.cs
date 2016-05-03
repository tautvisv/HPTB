using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using Models;
using UnitOfWork;

namespace Repositories
{
    public interface ITravelRepository : IGenericRepository<Travel>
    {
        IList<Travel> GetNewestTravels(int count);
    }
    public class TravelsRepository: GenericRepository<Travel>, ITravelRepository
    {
        public TravelsRepository(DatabaseDbContext context) : base(context)
        {
        }

        public override Travel GetById(int id)
        {
            var travel = _dbset
                .Include(x => x.Author).Include(x => x.EndDay.Point).Include(x => x.StartDay.Point).Include(x => x.Comments).Include(x => x.WayPoints.Select(w => w.TravelDays.Select(d => d.Point))).Include(x => x.WayPoints.Select(w => w.Point))
                .SingleOrDefault(x => x.Id == id);
            return travel;
        }

        public IList<Travel> GetNewestTravels(int count)
        {
            var travels = //_dbset.OrderByDescending(x => x.Id).Take(count).Include(x=>x.Author).Include(x => x.WayPoints).ToList();
            (from t in _dbset orderby t.Id descending select t).Include(x=> x.Author).Take(count).ToList();
            if (travels.Count > 0)
            {
                var author = travels.First().Author;
                author.ImageUrl = MinPhotoName(author.ImageUrl);
            }
            foreach (var travel in travels)
            {
                travel.CommentsCount = _entities.Entry(travel)
                          .Collection(t => t.Comments)
                          .Query()
                          .Count();
            }

            return travels;
        }
        //TODO move from here
        private string MinPhotoName(string photoName)
        {
            return Regex.Replace(photoName, @"(.*)([.])(.+)$", m => m.Groups[1].Value + ".min." + m.Groups[3].Value);
        }
    }
}

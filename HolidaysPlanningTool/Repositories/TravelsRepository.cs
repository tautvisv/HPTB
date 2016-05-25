using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using IRepositories;
using Models;
using UnitOfWork;

namespace Repositories
{
    public class TravelsRepository: GenericRepository<Travel>, ITravelRepository
    {
        public TravelsRepository(DatabaseDbContext context) : base(context)
        {
        }

        public override void Edit(Travel entity)
        {
            _entities.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            _entities.Entry(entity).Property(x => x.LikesCount).IsModified = false;
            _entities.Entry(entity).Property(x => x.ViewsCount).IsModified = false;
        }
        public override Travel Add(Travel entity)
        {
            entity.LikesCount = 0;
            entity.ViewsCount = 0;
            entity.KeyWords = CreateKeyWords(entity);
            return _dbset.Add(entity);
        }

        private string CreateKeyWords(Travel travel)
        {
            var keywords = new List<string> {travel.Name, travel.Description, travel.AuthorId};
            if (travel.StartDay != null)
            {
                keywords.Add(travel.StartDay.Name);
                keywords.Add(travel.StartDay.Description);
            }
            if (travel.EndDay != null)
            {
                keywords.Add(travel.EndDay.Name);
                keywords.Add(travel.EndDay.Description);
            }
            if (travel.WayPoints != null)
            {
                foreach (var travelDayPlan in travel.WayPoints)
                {
                    keywords.Add(travelDayPlan.Name);
                    keywords.Add(travelDayPlan.Description);
                    foreach (var travelPointPlan in travelDayPlan.TravelDays)
                    {

                        keywords.Add(travelPointPlan.Name);
                        keywords.Add(travelPointPlan.Description);
                    }
                }
            }
            return string.Join(" ", keywords);
        }
        public override Travel GetById(int id)
        {
            var travel = _dbset
                .Include(x => x.Author).Include(x => x.EndDay.Point).Include(x => x.StartDay.Point).Include(x => x.Comments.Select(c => c.Author)).Include(x => x.WayPoints.Select(w => w.TravelDays.Select(d => d.Point))).Include(x => x.WayPoints.Select(w => w.Point))
                .SingleOrDefault(x => x.Id == id);
            return travel;
        }

        public IList<Travel> GetNewestTravels(int count)
        {
            IQueryable<Travel> query = (from t in _dbset orderby t.Id descending select t);
            query = IncludeItemsToQuery(query);
            var travels = //_dbset.OrderByDescending(x => x.Id).Take(count).Include(x=>x.Author).Include(x => x.WayPoints).ToList();
            query.Take(count).ToList();
            foreach (var travel in travels)
            {
                travel.CommentsCount = _entities.Entry(travel)
                          .Collection(t => t.Comments)
                          .Query()
                          .Count();
            }
            ProcessTravelList(travels);
            return travels;
        }

        public PagedResult<Travel> GetUsersTravels(string userId, int skip, int take)
        {
            var travelsQuery = _dbset.Where(x => x.AuthorId.Equals(userId));
            travelsQuery = IncludeItemsToQuery(travelsQuery)
                .OrderByDescending(x => x.Id);

            travelsQuery = IncludeItemsToQuery(travelsQuery);
            var result = GetPagedResultForQuery(travelsQuery.OrderByDescending(x => x.Id), skip, take);
            ProcessTravelList(result.Results);
            return result;
        }

        public PagedResult<Travel> GetTravelsByLikes(string userId, int skip, int take)
        {
            var travelsQuery =
                _entities.Set<Like>()
                    .Where(x => x.UserId.Equals(userId) && x.Status == LikeStatuses.Like)
                    .Include(x => x.Travel)
                    .OrderByDescending(x => x.Id)
                    .Select(x => x.Travel);

            travelsQuery = IncludeItemsToQuery(travelsQuery);
            var result = GetPagedResultForQuery(travelsQuery, skip, take);
            ProcessTravelList(result.Results);
            return result;
        }

        public PagedResult<Travel> GetTravelsByViews(string userId, int skip, int take)
        {
            var travelsQuery =
                _entities.Set<View>()
                    .Where(x => x.UserId.Equals(userId))
                    .Include(x => x.Travel)
                    .OrderByDescending(x => x.Date)
                    .Select(x => x.Travel);
            travelsQuery = IncludeItemsToQuery(travelsQuery);
            var result = GetPagedResultForQuery(travelsQuery, skip, take);
            ProcessTravelList(result.Results);
            return result;
        }

        public PagedResult<Travel> Search(string phrase, int skip, int take)
        {
            //TODO padaryti ėdomią paiešką
            //IQueryable<Travel> travelsQuery;
            var travelsQuery = (from t in _dbset select t);
            if (!string.IsNullOrEmpty(phrase))
            {
                travelsQuery = travelsQuery.Where(
                    t => t.KeyWords.Contains(phrase) || 
                        t.Author.Name.Contains(phrase) || t.Author.UserId.Contains(phrase) ||
                        t.Author.UserId.Contains(phrase) || t.Name.Contains(phrase) || t.Description.Contains(phrase) || t.StartDay.Point.Address.Contains(phrase) || t.EndDay.Point.Address.Contains(phrase));
                // travelsQuery = (from t in _dbset where (t.Author.Name.Contains(phrase)) || t.Author.UserId.Contains(phrase) || t.Author.UserId.Contains(phrase) || t.Name.Contains(phrase) || t.Description.Contains(phrase) select t);
            }

            //var travels = travelsQuery.OrderByDescending(x => x.Id).Skip(skip).Take(take).ToList();
            travelsQuery = IncludeItemsToQuery(travelsQuery);
            var result = GetPagedResultForQuery(travelsQuery.OrderByDescending(x => x.Id), skip, take);
            ProcessTravelList(result.Results);
            return result;
        }
        private static PagedResult<Travel> GetPagedResultForQuery(IQueryable<Travel> query, int page, int pageSize)
        {
            var result = new PagedResult<Travel>();
            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.Count = query.Count();
            var pageCount = (double)result.Count / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);
            var skip = (page - 1) * pageSize;
            result.Results = query.Skip(skip).Take(pageSize).ToList();

            return result;
        }

        protected virtual IQueryable<Travel> IncludeItemsToQuery(IQueryable<Travel> query)
        {
            return query.Include(x => x.Author);
        }

        protected virtual void ProcessTravelList(IList<Travel> travels)
        {
            var minList = new List<User>();
            if (travels.Count > 0)
            {
                foreach (var travel in travels)
                {
                    var author = travel.Author;
                    if (!minList.Contains(author))
                    {
                        author.ImageUrl = MinPhotoName(author.ImageUrl);
                        minList.Add(author);
                    }

                }
            }
        }

        //TODO move from here
        private string MinPhotoName(string photoName)
        {
            if (string.IsNullOrEmpty(photoName)) return "";
            return Regex.Replace(photoName, @"(.*)([.])(.+)$", m => m.Groups[1].Value + ".min." + m.Groups[3].Value);
        }
    }
}

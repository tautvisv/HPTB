﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using Models;
using UnitOfWork;

namespace Repositories
{
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

        public IList<Travel> GetUsersTravels(string userId, int skip, int take)
        {
            var result = _dbset.Where(x => x.AuthorId.Equals(userId));
            result = IncludeItemsToQuery(result)
                .OrderByDescending(x => x.Id);

            var travels = result.Skip(skip).Take(take).ToList();
            ProcessTravelList(travels);
            return travels;
        }

        public IList<Travel> GetTravelsByLikes(string userId, int skip, int take)
        {
            var result =
                _entities.Set<Like>()
                    .Where(x => x.UserId.Equals(userId) && x.Status == LikeStatuses.Like)
                    .Include(x => x.Travel)
                    .OrderByDescending(x => x.Id)
                    .Select(x => x.Travel);

            result = IncludeItemsToQuery(result);
            var travels = result.Skip(skip).Take(take).ToList();
            ProcessTravelList(travels);
            return travels;
        }

        public IList<Travel> GetTravelsByViews(string userId, int skip, int take)
        {
            var result =
                _entities.Set<View>()
                    .Where(x => x.UserId.Equals(userId))
                    .Include(x => x.Travel)
                    .OrderByDescending(x => x.Id)
                    .Select(x => x.Travel);
            result = IncludeItemsToQuery(result);
            var travels = result.Skip(skip).Take(take).ToList();
            ProcessTravelList(travels);
            return travels;
        }

        public IList<Travel> Search(string phrase, int skip, int take)
        {
            //TODO padaryti ėdomią paiešką
            //IQueryable<Travel> travelsQuery;
            var travelsQuery = (from t in _dbset select t);
            if (!string.IsNullOrEmpty(phrase))
            {
                travelsQuery = travelsQuery.Where(
                    t =>
                        t.Author.Name.Contains(phrase) || t.Author.UserId.Contains(phrase) ||
                        t.Author.UserId.Contains(phrase) || t.Name.Contains(phrase) || t.Description.Contains(phrase) || t.StartDay.Point.Address.Contains(phrase) || t.EndDay.Point.Address.Contains(phrase));
                // travelsQuery = (from t in _dbset where (t.Author.Name.Contains(phrase)) || t.Author.UserId.Contains(phrase) || t.Author.UserId.Contains(phrase) || t.Name.Contains(phrase) || t.Description.Contains(phrase) select t);
            }
            travelsQuery = IncludeItemsToQuery(travelsQuery);
            var travels = travelsQuery.OrderByDescending(x => x.Id).Skip(skip).Take(take).ToList();
            ProcessTravelList(travels);
            return travels;
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
            return Regex.Replace(photoName, @"(.*)([.])(.+)$", m => m.Groups[1].Value + ".min." + m.Groups[3].Value);
        }
    }
}

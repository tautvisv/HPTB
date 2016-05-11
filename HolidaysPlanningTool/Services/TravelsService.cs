using System;
using System.Collections.Generic;
using System.Security.Principal;
using IMisc;
using IRepositories;
using IServices;
using Microsoft.AspNet.Identity;
using Models;

namespace Services
{
    public class TravelsService:EntityService<Travel>, ITravelService
    {
        public IIMageParser ImageParser { get; set; }
        protected readonly ITravelDayRepository TravelDayRepository;
        protected readonly ITravelRepository TravelRepository;
        public TravelsService(IUnitOfWork.IUnitOfWork unitOfWork, ITravelRepository repository, ITravelDayRepository travelDayRepository) : base(unitOfWork, repository)
        {
            TravelDayRepository = travelDayRepository;
            TravelRepository = repository;
        }

        public void Create(Travel travel, IIdentity identity)
        {
            if (travel == null)
            {
                throw new NullReferenceException(nameof(travel));
            }
            if (identity == null)
            {
                throw new NullReferenceException(nameof(identity));
            }
            var userId = identity.GetUserId();
            travel.AuthorId = userId;

            if (ImageParser != null)
            {
                ParseImage(travel.StartDay);
                ParseImage(travel.EndDay);
                if (travel.WayPoints != null)
                {
                    foreach (var travelDayPlan in travel.WayPoints)
                    {
                        ParseImage(travelDayPlan);
                    }
                }
            }

            if (travel.ImageUrls != null)
                travel.ImageUrl = string.Join("# #", travel.ImageUrls);
            var newTravel = _repository.Add(travel);
            //InsertAllTravelDays(newTravel, travel.WayPoints);
            //  AddTravelDayPlan(travel.StartDay, newTravel);
            // AddTravelDayPlan(travel.EndDay, newTravel);
            _unitOfWork.Commit();
        }
        private void ParseImage(TravelDayPlan travel)
        {
            if (travel == null) return;
            if(!string.IsNullOrEmpty(travel.ImageUrl)) return;
            travel.ImageUrl = ImageParser.Parse(travel.Point.Latitude, travel.Point.Longitude);
        }

        public Travel GetById(int id)
        {
            var travel = _repository.GetById(id);
            return travel;
        }
        

        public IList<Travel> GetRecentTravels(int count)
        {
            var travels = TravelRepository.GetNewestTravels(count);
            return travels;
        }

        public PagedResult<Travel> GetUsersTravels(IIdentity user, int skip, int count)
        {
            var travels = TravelRepository.GetUsersTravels(user.GetUserId(), skip, count);
            return travels;
        }

        public PagedResult<Travel> GetRecentViewedTravels(IIdentity user, int skip, int take)
        {
            var travels = TravelRepository.GetTravelsByViews(user.GetUserId(), skip, take);
            return travels;
        }

        public PagedResult<Travel> GetLikedTravels(IIdentity user, int skip, int take)
        {
            var travels = TravelRepository.GetTravelsByLikes(user.GetUserId(), skip, take);
            return travels;
        }

        public PagedResult<Travel> SearchTravels(string phrase, int skip, int take)
        {
            var travels = TravelRepository.Search(phrase, skip, take);
            return travels;
        }
    }

}


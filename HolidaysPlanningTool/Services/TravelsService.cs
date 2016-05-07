using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Models;
using Repositories;
using UnitOfWork;

namespace Services
{
    public class TravelsService:EntityService<Travel>, ITravelService
    {
        protected readonly ITravelDayRepository TravelDayRepository;
        protected readonly ITravelRepository TravelRepository;
        public TravelsService(IUnitOfWork unitOfWork, ITravelRepository repository, ITravelDayRepository travelDayRepository) : base(unitOfWork, repository)
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
            if(travel.ImageUrls != null)
                travel.ImageUrl = string.Join("# #", travel.ImageUrls);
            var newTravel = _repository.Add(travel);
            //InsertAllTravelDays(newTravel, travel.WayPoints);
            //  AddTravelDayPlan(travel.StartDay, newTravel);
            // AddTravelDayPlan(travel.EndDay, newTravel);
            _unitOfWork.Commit();
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

        public IList<Travel> GetUsersTravels(IIdentity user, int skip, int count)
        {
            var travels = TravelRepository.GetUsersTravels(user.GetUserId(), skip, count);
            return travels;
        }

        public IList<Travel> GetRecentViewedTravels(IIdentity user, int skip, int take)
        {
            var travels = TravelRepository.GetTravelsByViews(user.GetUserId(), skip, take);
            return travels;
        }

        public IList<Travel> GetLikedTravels(IIdentity user, int skip, int take)
        {
            var travels = TravelRepository.GetTravelsByLikes(user.GetUserId(), skip, take);
            return travels;
        }

        public IList<Travel> SearchTravels(string phrase, int skip, int take)
        {
            var travels = TravelRepository.Search(phrase, skip, take);
            return travels;
        }
    }

}

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
        protected readonly IPointRepository PointRepository;
        protected readonly ITravelDayRepository TravelDayRepository;
        public TravelsService(IUnitOfWork unitOfWork, ITravelRepository repository, IPointRepository pointRepository, ITravelDayRepository travelDayRepository) : base(unitOfWork, repository)
        {
            PointRepository = pointRepository;
            TravelDayRepository = travelDayRepository;
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

        protected void InsertAllTravelDays(Travel travel, IList<TravelDayPlan> waypoints)
        {
            var currentIndex = 0;
            foreach (var travelDayPlan in waypoints)
            {
                travelDayPlan.TravelId = travel.Id;
                travelDayPlan.OrderIndex = currentIndex;
                TravelDayRepository.Add(travelDayPlan);
                currentIndex++;
            }
        }
        protected void AddTravelDayPlan(TravelDayPlan travelPlan, Travel travel)
        {
            if (travelPlan == null) return;
            travelPlan.TravelId = travel.Id;
            PointRepository.Add(travelPlan.Point);
            travelPlan.PointId = travelPlan.Point.Id;
            TravelDayRepository.Add(travelPlan);
        }

    }

}

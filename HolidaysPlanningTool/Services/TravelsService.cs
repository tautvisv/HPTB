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
    public interface ITravelService:IEntityService<Travel>
    {
        void Create(Travel travel, IIdentity identity);
    }
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
            _repository.Add(travel);
            AddTravelDayPlan(travel.StartDay, travel);
            AddTravelDayPlan(travel.EndDay, travel);
            _unitOfWork.Commit();
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

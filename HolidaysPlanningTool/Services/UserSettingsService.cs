using System;
using Models;
using Repositories;
using UnitOfWork;

namespace Services
{
    public interface IUserSettingsService:IEntityService<User>
    {
        User GetUserSettings(string userId);
    }

    public class UserSettingsService: EntityService<User>, IUserSettingsService
    {
        protected readonly IUserSettingsRepository SettingsRepository;
        public UserSettingsService(IUnitOfWork uow, IUserSettingsRepository settingsRepository) : base(uow, settingsRepository)
        {
            this.SettingsRepository = settingsRepository;
        }
        public override void Update(User userSettings)
        {
            if (userSettings == null) throw new ArgumentNullException(nameof(userSettings));
            var settings = CreateSettings(userSettings);
            _repository.Edit(settings);
            _unitOfWork.Commit();
        }
        public User GetUserSettings(string userId)
        {
            var settings = SettingsRepository.GetByUserId(userId);
            return settings;
        }

        private User CreateSettings(User settings)
        {
            var newSettings = SettingsRepository.GetByUserId(settings.UserId);
            newSettings.Description = settings.Description;
            newSettings.Address = settings.Address;
            newSettings.Email = settings.Email;
            newSettings.ExtraInfo = settings.ExtraInfo;
            newSettings.ImageUrl = settings.ImageUrl;
            newSettings.Name = settings.Name;
            newSettings.Surname = settings.Surname;
            newSettings.Phone = settings.Phone;
            return newSettings;
        }
    }
}

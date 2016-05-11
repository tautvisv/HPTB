using System;
using IRepositories;
using IServices;
using Models;

namespace Services
{
    public interface IUserSettingsService:IEntityService<User>
    {
        User GetUserSettings(string userId);
        bool Exist(string username, string email);
    }

    public class UserSettingsService: EntityService<User>, IUserSettingsService
    {
        protected readonly IUserSettingsRepository SettingsRepository;
        public UserSettingsService(IUnitOfWork.IUnitOfWork uow, IUserSettingsRepository settingsRepository) : base(uow, settingsRepository)
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

        public bool Exist(string username, string email)
        {
            return SettingsRepository.Exist(username, email);
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

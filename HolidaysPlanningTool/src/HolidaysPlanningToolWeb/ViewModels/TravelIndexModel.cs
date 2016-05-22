using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HolidaysPlanningToolWeb.ViewModels
{
    public class TravelIndexModel
    {
        public TravelIndexModel(string serverApi)
        {
            ServerAPI = serverApi;
        }

        public string ServerAPI { get; }
    }
}

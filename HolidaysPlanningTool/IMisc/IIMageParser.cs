using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMisc
{
    public interface IIMageParser
    {
        string Parse(float latitude, float longitude);
    }
}

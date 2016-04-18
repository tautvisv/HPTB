using System;
using System.Reflection;

namespace HoolidaysPlanningToolsAPIMVC5.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}
/**************************************************************************
*
*  System:    Users Admin portal
*  Module:    Controllers
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  UserAdmin
*  Notes:     
*
*                   : History of Amendments :
*  Date        Name        Brief description                
*  ----------- ----------  ---------------------------------------------
*  02 AUG 2020 GM          Created
************************************************************************/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using UsersAdminPortal.Models;

namespace UsersAdminPortal.Controllers
{
    public class UserAdminController : Controller
    {
        private readonly IConfiguration _config;

        public UserAdminController(IConfiguration config)
        {
            _config = config;
        }

        public IActionResult Index()
        {
            string section = "Settings";

            IDictionary settings = _config.GetSection(section)
                .AsEnumerable()
                .Where(x => x.Key != section)
                .ToDictionary(x => x.Key.RemoveStart($"{section}:"), x => x.Value);

            string webApi = (string)settings["WebApi"];

            UserAdminViewModel userAdminViewModel = new UserAdminViewModel();
            userAdminViewModel.WebApi = webApi;

            return View(userAdminViewModel);
        }
    }

    public static class StringExtensions
    {
        public static string RemoveStart(this string target, string value)
        {
            if (target.StartsWith(value))
            {
                return target.Substring(value.Length);
            }

            return target;
        }
    }
}

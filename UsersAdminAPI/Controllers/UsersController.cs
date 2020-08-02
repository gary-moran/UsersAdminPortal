/**************************************************************************
*
*  System:    Users Admin portal
*  Module:    Controllers
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  Users
*  Notes:     
*
*                   : History of Amendments :
*  Date        Name        Brief description                
*  ----------- ----------  ---------------------------------------------
*  02 AUG 2020 GM          Created
************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UsersAdminAPI.Data;

namespace UsersAdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Context _context;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public UsersController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            // to convert properties to camel-case
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

            // return users
            try
            {
                return this.Content(JsonConvert.SerializeObject(new { data = _context.Users }, settings), "application/json");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }                            
        }
    }
}
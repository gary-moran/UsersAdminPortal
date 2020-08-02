/**************************************************************************
*
*  System:    Users Admin portal
*  Module:    Data
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  User model
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
using System.Text;
using System.Threading.Tasks;

namespace UsersAdminAPI.Data.Entities
{
    public class User
    {
        // default parameterless constructor
        public User() { }

        // constructor
        public User(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

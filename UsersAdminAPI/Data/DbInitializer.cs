/**************************************************************************
*
*  System:    Users Admin portal
*  Module:    Data
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  DB Initializer
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

namespace UsersAdminAPI.Data
{
    public class DbInitializer
    {
        /// <summary>
        /// Initialise DB
        /// </summary>
        /// <param name="context">DB Context</param>
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            // On creation create users
            context.Users.Add(new Entities.User("Isaac", "Newton"));
            context.Users.Add(new Entities.User("Albert", "Einstein"));
            context.Users.Add(new Entities.User("Marie", "Curie"));
            context.Users.Add(new Entities.User("James", "Maxwell"));
            context.Users.Add(new Entities.User("Michael", "Faraday"));
            context.Users.Add(new Entities.User("Charles", "Darwin"));
            context.Users.Add(new Entities.User("Louis", "Pasteur"));
            context.Users.Add(new Entities.User("Nikola", "Tesla"));
            context.Users.Add(new Entities.User("Neils", "Bohr"));
            context.Users.Add(new Entities.User("Gregor", "Mendel"));
            context.Users.Add(new Entities.User("Max", "Planck"));
            context.Users.Add(new Entities.User("Ernest", "Rutherford"));
            context.Users.Add(new Entities.User("Robert", "Boyle"));
            context.Users.Add(new Entities.User("Werner", "Heisenberg"));
            context.Users.Add(new Entities.User("James", "Maxwell"));
            context.SaveChanges();
        }
    }
}

using AI.HR.Models;

namespace AI.HR.BL;

/// <summary>
/// Business logic for user operations.
/// </summary>
public interface IUserBL
{
    /// <summary>Signs up a user: maps the request to a UserItem, upserts it, and builds the response.</summary>
    Task<UsersModel> SignUp(UsersModel usersModel);
}

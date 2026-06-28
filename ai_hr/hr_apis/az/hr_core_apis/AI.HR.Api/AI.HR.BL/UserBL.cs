using AI.HR.Models;
using AI.HR.Repoistories;

namespace AI.HR.BL;

/// <summary>
/// Business logic for user operations. Maps UserRequest to UserItem
/// and delegates persistence to UserRepository.
/// </summary>
public class UserBL
{
    private readonly UserRepository _userRepository;

    /// <summary>Creates the business layer with the given UserRepository.</summary>
    public UserBL(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    /// <summary>Signs up a user: maps the request to a UserItem, upserts it, and builds the response.</summary>
    public async Task<UsersModel> SignUp(UsersModel usersModel)
    {
        usersModel.UserItem = ToUserItem(usersModel.UserRequest);

        var savedItem = await _userRepository.Upsert(usersModel.UserItem);
        usersModel.UserItem = savedItem;

        usersModel.UserResponse = ToUserResponse(savedItem);
        usersModel.IsNotValid = false;
        usersModel.Message = "User signed up successfully.";

        return usersModel;
    }

    private static UserItem ToUserItem(UserRequest request) => new()
    {
        FullName = request.FullName,
        Email = request.Email,
        Company = request.Company,
        PasswordHash = request.Password,
    };

    private static UserResponse ToUserResponse(UserItem userItem) => new()
    {
        UserId = userItem.UserId,
        FullName = userItem.FullName,
        Email = userItem.Email,
        Company = userItem.Company,
        CreatedAt = userItem.CreatedAt,
        IsActive = userItem.IsActive,
    };
}

using AI.HR.Models;

namespace AI.HR.BL;

/// <summary>
/// Validates the UserRequest carried on a UsersModel.
/// </summary>
public interface IUserValidationService
{
    /// <summary>Validates UsersModel.UserRequest, setting IsNotValid/Message on the model.</summary>
    UsersModel Validate(UsersModel usersModel);

    /// <summary>Validates LoginModel.LoginRequest, setting IsNotValid/Message on the model.</summary>
    LoginModel ValidateLogin(LoginModel loginModel);
}

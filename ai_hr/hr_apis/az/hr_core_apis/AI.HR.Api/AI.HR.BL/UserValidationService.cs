using System.Text.RegularExpressions;
using AI.HR.Models;

namespace AI.HR.BL;

/// <summary>
/// Validates the UserRequest carried on a UsersModel and sets the
/// IsNotValid/Message status accordingly.
/// </summary>
public class UserValidationService
{
    private static readonly Regex EmailPattern = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled);

    /// <summary>Validates UsersModel.UserRequest, setting IsNotValid/Message on the model.</summary>
    public UsersModel Validate(UsersModel usersModel)
    {
        var request = usersModel.UserRequest;

        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            usersModel.IsNotValid = true;
            usersModel.Message = "FullName is required.";
            return usersModel;
        }

        if (string.IsNullOrWhiteSpace(request.Email) || !EmailPattern.IsMatch(request.Email))
        {
            usersModel.IsNotValid = true;
            usersModel.Message = "A valid Email is required.";
            return usersModel;
        }

        if (string.IsNullOrWhiteSpace(request.Company))
        {
            usersModel.IsNotValid = true;
            usersModel.Message = "Company is required.";
            return usersModel;
        }

        if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 8)
        {
            usersModel.IsNotValid = true;
            usersModel.Message = "Password is required and must be at least 8 characters.";
            return usersModel;
        }

        usersModel.IsNotValid = false;
        usersModel.Message = "Validation passed.";
        return usersModel;
    }
}

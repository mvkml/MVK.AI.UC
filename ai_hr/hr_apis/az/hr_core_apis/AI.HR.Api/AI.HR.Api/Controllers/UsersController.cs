using AI.HR.BL;
using AI.HR.Models;
using Microsoft.AspNetCore.Mvc;

namespace AI.HR.Api.Controllers;

/// <summary>
/// Handles HTTP requests for user operations (Sign Up, etc.).
/// </summary>
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserValidationService _userValidationService;
    private readonly UserBL _userBL;

    /// <summary>Creates the controller with the given validation service and business layer.</summary>
    public UsersController(UserValidationService userValidationService, UserBL userBL)
    {
        _userValidationService = userValidationService;
        _userBL = userBL;
    }

    /// <summary>Signs up a new user.</summary>
    [HttpPost("signup")]
    public async Task<ActionResult<UserResponse>> SignUp([FromBody] UserRequest userRequest)
    {
        var usersModel = new UsersModel { UserRequest = userRequest };

        usersModel = _userValidationService.Validate(usersModel);
        if (usersModel.IsNotValid)
        {
            return BadRequest(new UserResponse
            {
                IsNotValid = true,
                Message = usersModel.Message,
            });
        }

        usersModel = await _userBL.SignUp(usersModel);
        return Ok(usersModel.UserResponse);
    }
}

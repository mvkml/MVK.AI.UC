using AI.HR.BL;
using AI.HR.Models;
using AI.HR.Repoistories;
using Microsoft.AspNetCore.Mvc;

namespace AI.HR.Api.Controllers;

/// <summary>
/// Handles HTTP requests for user operations (Sign Up, get roles, etc.).
/// </summary>
[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IUserValidationService _userValidationService;
    private readonly IUserBL _userBL;
    private readonly IRoleRepository _roleRepository;

    /// <summary>Creates the controller with the given validation service, business layer, and role repository.</summary>
    public UsersController(IUserValidationService userValidationService, IUserBL userBL, IRoleRepository roleRepository)
    {
        _userValidationService = userValidationService;
        _userBL = userBL;
        _roleRepository = roleRepository;
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

    /// <summary>Gets all roles (e.g. to populate the Sign Up role dropdown).</summary>
    [HttpGet("roles")]
    public async Task<ActionResult<RolesModel>> GetRoles()
    {
        var roleItems = await _roleRepository.GetAll();
        return Ok(new RolesModel { RoleItems = roleItems });
    }
}

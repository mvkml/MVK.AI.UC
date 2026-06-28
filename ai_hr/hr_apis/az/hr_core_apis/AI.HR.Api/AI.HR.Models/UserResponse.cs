namespace AI.HR.Models;

/// <summary>
/// Outgoing response payload returned to the client for user operations (e.g. Sign Up).
/// </summary>
public class UserResponse : BaseModel
{
    /// <summary>Primary key of the user.</summary>
    public int UserId { get; set; }

    /// <summary>Full name of the user.</summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>Email address used for login.</summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>Company the user belongs to.</summary>
    public string Company { get; set; } = string.Empty;

    /// <summary>UTC timestamp when the user was created.</summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>Whether the user account is active.</summary>
    public bool IsActive { get; set; } = true;
}

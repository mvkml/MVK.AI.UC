namespace AI.HR.Models;

/// <summary>
/// Represents a single user record, mirroring the Users table.
/// </summary>
public class UserItem
{
    /// <summary>Primary key of the user.</summary>
    public int UserId { get; set; }

    /// <summary>Full name of the user.</summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>Unique email address used for login.</summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>Company the user belongs to.</summary>
    public string Company { get; set; } = string.Empty;

    /// <summary>Hashed password (never store plain text).</summary>
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>UTC timestamp when the user was created.</summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>Whether the user account is active.</summary>
    public bool IsActive { get; set; } = true;

    /// <summary>Foreign key to the user's Role.</summary>
    public int RoleId { get; set; }
}

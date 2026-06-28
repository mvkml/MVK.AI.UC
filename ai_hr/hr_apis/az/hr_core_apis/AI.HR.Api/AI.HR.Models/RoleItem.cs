namespace AI.HR.Models;

/// <summary>
/// Represents a single role record, mirroring the Roles table.
/// </summary>
public class RoleItem
{
    /// <summary>Primary key of the role.</summary>
    public int RoleId { get; set; }

    /// <summary>Display name of the role.</summary>
    public string RoleName { get; set; } = string.Empty;
}

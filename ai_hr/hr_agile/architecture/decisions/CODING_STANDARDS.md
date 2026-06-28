# Coding Standards — Owned by Architect Agent

## C# XML Doc Comments
Every public class and public property in `AI.HR.Models` (and going forward, all backend projects) must have an XML `<summary>` doc comment.

### Class
```csharp
/// <summary>
/// One-line description of what the class represents.
/// </summary>
public class Example
{
}
```

### Property
```csharp
/// <summary>One-line description of the property's purpose.</summary>
public string Example { get; set; } = string.Empty;
```

### Rules
- Summaries are one line, describing purpose — not restating the property name.
- Required on every public class and public property.
- Enforced by Architect Agent during review; Dev agents apply it as they write new models/entities.

---
*Defined by: Architect Agent | Date: 2026-06-28*

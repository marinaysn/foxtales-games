namespace FoxTales.Api.Domain.Bingo;

/// <summary>
/// Draws the 75 Bingo balls randomly without replacement. Create a new instance for each round.
/// The default picker is cryptographically secure; every remaining ball is equally likely on each draw.
/// </summary>
public sealed class BallDrawer
{
    public const int Count = 75;

    private readonly Func<int, int> pick;

    private readonly List<int> remaining = Enumerable.Range(1, Count).ToList();

    private readonly List<int> drawn = [];

    public BallDrawer() : this(System.Security.Cryptography.RandomNumberGenerator.GetInt32)
    {
    }

    /// <param name="pick">Returns an index in [0, count) for the given count. Intended for deterministic tests.</param>
    public BallDrawer(Func<int, int> pick)
    {
        this.pick = pick;
        Drawn = drawn.AsReadOnly();
    }

    public IReadOnlyList<int> Drawn { get; }

    public int Remaining => remaining.Count;

    public int Draw() => TryDraw(out var ball) ? ball : throw new InvalidOperationException("All balls have been drawn.");

    public bool TryDraw(out int ball)
    {
        ball = 0;
        if (remaining.Count == 0) return false;
        var index = pick(remaining.Count);
        if (index < 0 || index >= remaining.Count) throw new InvalidOperationException($"Picker returned invalid index {index}.");
        ball = remaining[index];
        remaining[index] = remaining[^1];
        remaining.RemoveAt(remaining.Count - 1);
        drawn.Add(ball);
        return true;
    }
}

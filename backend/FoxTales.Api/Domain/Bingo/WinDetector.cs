namespace FoxTales.Api.Domain.Bingo;

/// <summary>
/// Finds completed Bingo lines from server-authorized marked positions (row-major indices 0..24).
/// FREE squares count automatically. Whether a mark was allowed is decided elsewhere.
/// </summary>
public static class WinDetector
{
    private static readonly IReadOnlyList<IReadOnlyList<int>> Lines = CreateLines();

    public static IReadOnlyList<IReadOnlyList<int>> FindWinningLines(Card card, IReadOnlySet<int> marked)
    {
        var invalid = marked.Where(position => position < 0 || position >= card.Squares.Count).ToArray();
        if (invalid.Length > 0) throw new ArgumentOutOfRangeException(nameof(marked), $"Marked position {invalid[0]} is outside the card.");
        return Array.AsReadOnly(Lines.Where(line => line.All(position => marked.Contains(position) || card.Squares[position].IsFree)).ToArray());
    }

    private static IReadOnlyList<IReadOnlyList<int>> CreateLines()
    {
        var size = Card.Size;
        var indices = Enumerable.Range(0, size).ToArray();
        var lines = new List<int[]>();
        lines.AddRange(indices.Select(row => indices.Select(column => row * size + column).ToArray()));
        lines.AddRange(indices.Select(column => indices.Select(row => row * size + column).ToArray()));
        lines.Add(indices.Select(index => index * size + index).ToArray());
        lines.Add(indices.Select(index => index * size + size - 1 - index).ToArray());
        return lines.Select(line => (IReadOnlyList<int>)Array.AsReadOnly(line)).ToArray();
    }
}

namespace FoxTales.Api.Domain.Bingo;

/// <summary>A 5x5 Bingo card. Squares are row-major and cannot be modified after creation.</summary>
public sealed class Card
{
    public const int Size = 5;

    public Card(IEnumerable<Square> squares)
    {
        Squares = Array.AsReadOnly(squares.ToArray());
    }

    public IReadOnlyList<Square> Squares { get; }

    public Square this[int row, int column] => Squares[row * Size + column];
}

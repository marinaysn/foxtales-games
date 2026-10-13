namespace FoxTales.Api.Domain.Bingo;

public static class CardGenerator
{
    private const int Range = 15;

    private const int Center = 2;

    public static Card Generate() => Generate(Random.Shared);

    public static Card Generate(Random random)
    {
        var columns = Enumerable.Range(0, Card.Size).Select(column => Column(random, column)).ToArray();
        return new Card(Enumerable.Range(0, Card.Size * Card.Size).Select(index => columns[index % Card.Size][index / Card.Size]));
    }

    private static Square[] Column(Random random, int column)
    {
        var numbers = Enumerable.Range(column * Range + 1, Range).ToArray();
        random.Shuffle(numbers);
        var squares = numbers.Take(Card.Size).Select(number => new Square(number)).ToArray();
        if (column == Center) squares[Center] = Square.Free;
        return squares;
    }
}

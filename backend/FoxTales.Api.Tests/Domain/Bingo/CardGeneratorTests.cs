using FoxTales.Api.Domain.Bingo;

namespace FoxTales.Api.Tests.Domain.Bingo;

public class CardGeneratorTests
{
    private readonly Card card = CardGenerator.Generate(new Random(1));

    [Fact]
    public void CardHasTwentyFiveSquares()
    {
        Assert.Equal(25, card.Squares.Count);
    }

    [Fact]
    public void CenterSquareIsFree()
    {
        Assert.True(card[2, 2].IsFree);
    }

    [Fact]
    public void OnlyCenterSquareIsFree()
    {
        Assert.Equal(1, card.Squares.Count(square => square.IsFree));
    }

    [Fact]
    public void ColumnsRespectNumberRanges()
    {
        var valid = Enumerable.Range(0, 5).All(column => Enumerable.Range(0, 5).All(row => card[row, column].IsFree || InRange(card[row, column].Number!.Value, column)));
        Assert.True(valid);
    }

    [Fact]
    public void NumbersAreUnique()
    {
        var numbers = card.Squares.Where(square => !square.IsFree).Select(square => square.Number).ToArray();
        Assert.Equal(24, numbers.Distinct().Count());
    }

    [Fact]
    public void SameSeedGeneratesSameCard()
    {
        Assert.Equal(card.Squares, CardGenerator.Generate(new Random(1)).Squares);
    }

    private static bool InRange(int number, int column) => number > column * 15 && number <= (column + 1) * 15;
}

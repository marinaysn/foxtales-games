using FoxTales.Api.Domain.Bingo;

namespace FoxTales.Api.Tests.Domain.Bingo;

public class WinDetectorTests
{
    private readonly Card card = CardGenerator.Generate(new Random(1));

    [Theory]
    [InlineData(0, 1, 2, 3, 4)]
    [InlineData(5, 6, 7, 8, 9)]
    [InlineData(10, 11, 13, 14)]
    [InlineData(15, 16, 17, 18, 19)]
    [InlineData(20, 21, 22, 23, 24)]
    public void CompletedRowWins(params int[] marked)
    {
        Assert.Single(WinDetector.FindWinningLines(card, marked.ToHashSet()));
    }

    [Theory]
    [InlineData(0, 5, 10, 15, 20)]
    [InlineData(1, 6, 11, 16, 21)]
    [InlineData(2, 7, 17, 22)]
    [InlineData(3, 8, 13, 18, 23)]
    [InlineData(4, 9, 14, 19, 24)]
    public void CompletedColumnWins(params int[] marked)
    {
        Assert.Single(WinDetector.FindWinningLines(card, marked.ToHashSet()));
    }

    [Theory]
    [InlineData(0, 6, 18, 24)]
    [InlineData(4, 8, 16, 20)]
    public void CompletedDiagonalWinsWithFreeCenter(params int[] marked)
    {
        Assert.Single(WinDetector.FindWinningLines(card, marked.ToHashSet()));
    }

    [Fact]
    public void FreeCenterCountsWithoutMark()
    {
        Assert.Equal([10, 11, 12, 13, 14], WinDetector.FindWinningLines(card, new HashSet<int> { 10, 11, 13, 14 })[0]);
    }

    [Fact]
    public void FourMarkedSquaresWithoutFreeDoNotWin()
    {
        Assert.Empty(WinDetector.FindWinningLines(card, new HashSet<int> { 0, 1, 2, 3 }));
    }

    [Fact]
    public void UnmarkedSquaresDoNotWin()
    {
        Assert.Empty(WinDetector.FindWinningLines(card, new HashSet<int>()));
    }

    [Fact]
    public void FullCardWinsAllTwelveLines()
    {
        Assert.Equal(12, WinDetector.FindWinningLines(card, Enumerable.Range(0, 25).ToHashSet()).Count);
    }

    [Fact]
    public void RowAndColumnWinTogether()
    {
        Assert.Equal(2, WinDetector.FindWinningLines(card, new HashSet<int> { 0, 1, 2, 3, 4, 5, 10, 15, 20 }).Count);
    }

    [Fact]
    public void ReturnedLineCannotBeModified()
    {
        var line = (IList<int>)WinDetector.FindWinningLines(card, new HashSet<int> { 0, 1, 2, 3, 4 })[0];
        Assert.Throws<NotSupportedException>(() => line[0] = 99);
    }

    [Fact]
    public void ReturnedCollectionCannotBeModified()
    {
        var lines = (IList<IReadOnlyList<int>>)WinDetector.FindWinningLines(card, new HashSet<int> { 0, 1, 2, 3, 4 });
        Assert.Throws<NotSupportedException>(() => lines.Clear());
    }

    [Theory]
    [InlineData(-1)]
    [InlineData(25)]
    public void PositionOutsideCardThrows(int position)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => WinDetector.FindWinningLines(card, new HashSet<int> { position }));
    }
}

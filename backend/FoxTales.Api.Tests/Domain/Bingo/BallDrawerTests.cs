using FoxTales.Api.Domain.Bingo;

namespace FoxTales.Api.Tests.Domain.Bingo;

public class BallDrawerTests
{
    private readonly BallDrawer drawer = new();

    private void DrawAll()
    {
        for (var count = 0; count < BallDrawer.Count; count++) drawer.Draw();
    }

    [Fact]
    public void AllSeventyFiveBallsAreDrawnExactlyOnce()
    {
        DrawAll();
        Assert.Equal(Enumerable.Range(1, 75), drawer.Drawn.Order());
    }

    [Fact]
    public void DrawnHistoryKeepsDrawOrder()
    {
        var first = drawer.Draw();
        var second = drawer.Draw();
        Assert.Equal([first, second], drawer.Drawn);
    }

    [Fact]
    public void DrawnHistoryCannotBeModifiedExternally()
    {
        drawer.Draw();
        Assert.Throws<NotSupportedException>(() => ((IList<int>)drawer.Drawn).Add(1));
    }

    [Fact]
    public void RemainingDecreasesWithEachDraw()
    {
        drawer.Draw();
        Assert.Equal(74, drawer.Remaining);
    }

    [Fact]
    public void DrawingBeyondInitialRoundStaysUnique()
    {
        for (var count = 0; count < 50; count++) drawer.Draw();
        Assert.Equal(50, drawer.Drawn.Distinct().Count());
    }

    [Fact]
    public void DrawThrowsWhenExhausted()
    {
        DrawAll();
        Assert.Throws<InvalidOperationException>(() => drawer.Draw());
    }

    [Fact]
    public void TryDrawReturnsFalseWhenExhausted()
    {
        DrawAll();
        Assert.False(drawer.TryDraw(out _));
    }

    [Fact]
    public void SameSeedDrawsSameSequence()
    {
        var first = new BallDrawer(new Random(1).Next);
        var second = new BallDrawer(new Random(1).Next);
        Assert.Equal(first.Draw(), second.Draw());
    }

    [Fact]
    public void PreviouslyObtainedDrawnReflectsSubsequentDraw()
    {
        var history = drawer.Drawn;
        drawer.Draw();
        Assert.Single(history);
    }

    [Fact]
    public void InvalidPickerIndexLeavesStateUnchanged()
    {
        var calls = 0;
        var broken = new BallDrawer(count => calls++ == 0 ? 0 : count);
        broken.Draw();
        Attempt(broken);
        Assert.Equal("74:1", $"{broken.Remaining}:{string.Join(",", broken.Drawn)}");
    }

    private static void Attempt(BallDrawer drawer)
    {
        try { drawer.Draw(); }
        catch (InvalidOperationException) { }
    }

    [Fact]
    public void InvalidPickerIndexIsRejected()
    {
        var broken = new BallDrawer(count => count);
        Assert.Throws<InvalidOperationException>(() => broken.Draw());
    }
}

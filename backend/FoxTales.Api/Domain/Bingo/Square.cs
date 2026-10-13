namespace FoxTales.Api.Domain.Bingo;

public readonly record struct Square(int? Number)
{
    public static Square Free => new(null);

    public bool IsFree => Number is null;
}

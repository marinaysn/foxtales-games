using Microsoft.EntityFrameworkCore;

namespace FoxTales.Api.Infrastructure;

public static class DatabaseExtensions
{
    public static IServiceCollection AddFoxTalesDatabase(this IServiceCollection services, IConfiguration configuration) =>
        services.AddDbContext<FoxTalesDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("FoxTales")));
}

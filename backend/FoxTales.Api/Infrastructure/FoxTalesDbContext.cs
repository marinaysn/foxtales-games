using Microsoft.EntityFrameworkCore;

namespace FoxTales.Api.Infrastructure;

public class FoxTalesDbContext(DbContextOptions<FoxTalesDbContext> options) : DbContext(options);

using AI.HR.BL;
using AI.HR.EF.DBContexts;
using AI.HR.Repoistories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AiHrDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AiHrDb")));

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserBL>();
builder.Services.AddScoped<UserValidationService>();


var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

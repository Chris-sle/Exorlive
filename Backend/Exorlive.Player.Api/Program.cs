using System.Data;
using Dapper;
using MySqlConnector;
using Scalar.AspNetCore;
using Microsoft.Extensions.Options;
using Exorlive.Player.Api.Dtos;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.Configure<MediaSettings>(
    builder.Configuration.GetSection("MediaSettings"));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddScoped<IDbConnection>(_ =>
    new MySqlConnection(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// GET /api/workouts – liste av økter
app.MapGet("/api/workouts",
    async (IDbConnection db) =>
    {
        const string sql = """
        SELECT Id, Title, Description, ScheduledDate, Duration
        FROM Workouts
        ORDER BY ScheduledDate DESC, Id;
        """;

        var rows = await db.QueryAsync(sql);

        var result = rows.Select(w => new WorkoutDto
        {
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            ScheduledDate = w.ScheduledDate,
            Duration = w.Duration
        });

        return Results.Ok(result);
    });

// GET /api/workouts/{id} – økt + øvelser
app.MapGet("/api/workouts/{id:int}",
    async (int id,
           IDbConnection db,
           IWebHostEnvironment env) =>
    {
        const string workoutSql = """
        SELECT Id, Title, Description, ScheduledDate, Duration
        FROM Workouts
        WHERE Id = @Id;
        """;

        const string exercisesSql = """
        SELECT we.OrderIndex,
               e.Id,
               e.Title
        FROM WorkoutExercises we
        JOIN Exercises e ON we.ExerciseId = e.Id
        WHERE we.WorkoutId = @Id
        ORDER BY we.OrderIndex;
        """;

        var workoutRow = await db.QuerySingleOrDefaultAsync(workoutSql, new { Id = id });
        if (workoutRow is null) return Results.NotFound();

        var exerciseRows = await db.QueryAsync(exercisesSql, new { Id = id });

        var dto = new WorkoutDto
        {
            Id = workoutRow.Id,
            Title = workoutRow.Title,
            Description = workoutRow.Description,
            ScheduledDate = workoutRow.ScheduledDate,
            Duration = workoutRow.Duration,
            Exercises = exerciseRows.Select(er => new WorkoutExerciseDto
            {
                ExerciseId = er.Id,
                OrderIndex = er.OrderIndex,
                Title = er.Title,
                ThumbnailUrl = $"/api/exercises/{er.Id}/thumbnail"
            }).ToList()
        };

        return Results.Ok(dto);
    });

// GET /api/exercises/{id} – detaljer + sett
app.MapGet("/api/exercises/{id:int}",
    async (int id,
           IDbConnection db) =>
    {
        const string exerciseSql = """
        SELECT Id, Title, Description, Duration
        FROM Exercises
        WHERE Id = @Id;
        """;

        const string setsSql = """
        SELECT SetNumber, Repetitions
        FROM ExerciseSets
        WHERE ExerciseId = @Id
        ORDER BY SetNumber;
        """;

        var exerciseRow = await db.QuerySingleOrDefaultAsync(exerciseSql, new { Id = id });
        if (exerciseRow is null) return Results.NotFound();

        var setRows = await db.QueryAsync(setsSql, new { Id = id });

        var dto = new ExerciseDto
        {
            Id = exerciseRow.Id,
            Title = exerciseRow.Title,
            Description = exerciseRow.Description,
            Duration = exerciseRow.Duration,
            ThumbnailUrl = $"/api/exercises/{exerciseRow.Id}/thumbnail",
            VideoUrl = $"/api/exercises/{exerciseRow.Id}/video",
            Sets = setRows.Select(s => new ExerciseSetDto
            {
                SetNumber = s.SetNumber,
                Repetitions = s.Repetitions
            }).ToList()
        };

        return Results.Ok(dto);
    });

// GET /api/exercises/{id}/video – serve video-fil
app.MapGet("/api/exercises/{id:int}/video",
    async (int id,
           IDbConnection db,
           IOptions<MediaSettings> mediaOptions,
           IWebHostEnvironment env) =>
    {
        const string sql = """
        SELECT VideoFileName
        FROM Exercises
        WHERE Id = @Id;
        """;

        var fileName = await db.ExecuteScalarAsync<string?>(sql, new { Id = id });
        if (string.IsNullOrEmpty(fileName))
            return Results.NotFound();

        var settings = mediaOptions.Value;
        var basePath = Path.Combine(env.ContentRootPath, settings.VideoFolder);
        var filePath = Path.Combine(basePath, fileName);

        if (!File.Exists(filePath))
            return Results.NotFound();

        var stream = File.OpenRead(filePath);
        return Results.File(stream, "video/mp4");
});

app.MapGet("/api/exercises/{id:int}/thumbnail",
    async (int id,
           IDbConnection db,
           IOptions<MediaSettings> mediaOptions,
           IWebHostEnvironment env) =>
    {
        const string sql = """
        SELECT ThumbnailFileName
        FROM Exercises
        WHERE Id = @Id;
        """;

        var fileName = await db.ExecuteScalarAsync<string?>(sql, new { Id = id });
        if (string.IsNullOrEmpty(fileName))
            return Results.NotFound();

        var settings = mediaOptions.Value;
        var basePath = Path.Combine(env.ContentRootPath, settings.ThumbnailFolder);
        var filePath = Path.Combine(basePath, fileName);

        if (!File.Exists(filePath))
            return Results.NotFound();

        // Her antar vi jpeg – evt. bruk ContentType-kolonne i databasen
        return Results.File(filePath, "image/jpeg");
});

app.Run();
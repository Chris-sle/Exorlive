namespace Exorlive.Player.Api.Dtos;

public sealed class WorkoutDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public int? Duration { get; set; }

    public IList<WorkoutExerciseDto> Exercises { get; set; } = new List<WorkoutExerciseDto>();
}

public sealed class WorkoutExerciseDto
{
    public int ExerciseId { get; set; }
    public int OrderIndex { get; set; }
    public string Title { get; set; } = default!;
    public string ThumbnailUrl { get; set; } = default!;

    public int TotalSets { get; set; }
    public int? RepetitionsPerSet { get; set; }
}
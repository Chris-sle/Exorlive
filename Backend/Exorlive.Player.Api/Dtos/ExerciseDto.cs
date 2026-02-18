namespace Exorlive.Player.Api.Dtos;

public sealed class ExerciseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public int? Duration { get; set; }

    public string ThumbnailUrl { get; set; } = default!;
    public string VideoUrl { get; set; } = default!;
    public IList<ExerciseSetDto> Sets { get; set; } = new List<ExerciseSetDto>();
}
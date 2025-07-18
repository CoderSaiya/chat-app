namespace ChatMicroservice.Shared.Common;

public class Filter
{
    public string? SortBy { get; set; }
    public bool SortDescending { get; set; } = false;
    public int? Skip { get; set; }
    public int? Take { get; set; }
}
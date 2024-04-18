using Application.Core;

namespace Application.Activities
{
    // фильтрация активности.
    public class ActivityParams : PagingParams
    {
        // участвует ли пользователь в активности
        public bool IsGoing { get; set; }
        // является ли пользователь создателем активности
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
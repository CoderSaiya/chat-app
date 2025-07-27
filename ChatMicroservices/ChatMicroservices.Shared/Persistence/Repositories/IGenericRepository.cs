using System.Linq.Expressions;

namespace ChatMicroservice.Shared.Persistence.Repositories;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<T>> ListAsync(CancellationToken ct = default);
    Task<IEnumerable<T>> ListAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
    Task<IEnumerable<T>> ListAsync<TFilter>(TFilter filter, CancellationToken ct = default)
        where TFilter : class;
    Task AddAsync(T entity, CancellationToken ct = default);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default);
    Task<bool> ExistsAsync(Guid id);
}
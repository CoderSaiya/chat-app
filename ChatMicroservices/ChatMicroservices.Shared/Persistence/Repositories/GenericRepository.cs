using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace ChatMicroservice.Shared.Persistence.Repositories;

public class GenericRepository<T>(DbContext context) : IGenericRepository<T> where T : class
{
    public virtual async Task<T?> GetByIdAsync(Guid id, CancellationToken ct = default) => 
        await context.Set<T>().FindAsync([id], cancellationToken: ct);

    public virtual async Task<IEnumerable<T>> ListAsync(CancellationToken ct = default) => 
        await context.Set<T>().ToListAsync(cancellationToken: ct);

    public virtual async Task<IEnumerable<T>> ListAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default) =>
        await context.Set<T>().Where(predicate).ToListAsync(cancellationToken: ct);
    
    public virtual async Task<IEnumerable<T>> ListAsync<TFilter>(TFilter filter, CancellationToken ct = default)
        where TFilter : class
    {
        IQueryable<T> query = context.Set<T>();
        
        foreach (var prop in typeof(TFilter).GetProperties())
        {
            var value = prop.GetValue(filter);
            if (value == null) continue;

            var entityProp = typeof(T).GetProperty(prop.Name);
            if (entityProp == null) continue;
            
            var param = Expression.Parameter(typeof(T), "x");
            var left = Expression.Property(param, entityProp);
            var right = Expression.Constant(value);
            var equal = Expression.Equal(left, right);
            var lambda = Expression.Lambda<Func<T, bool>>(equal, param);

            query = query.Where(lambda);
        }

        return await query.ToListAsync(cancellationToken: ct);
    }

    public async Task AddAsync(T entity, CancellationToken ct = default) => 
        await context.Set<T>().AddAsync(entity, cancellationToken: ct);

    public Task UpdateAsync(T entity)
    {
        context.Set<T>().Update(entity);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var e = await context.Set<T>().FindAsync([id], cancellationToken: ct);
        if (e != null) context.Set<T>().Remove(e);
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate, CancellationToken ct = default) =>
        await context.Set<T>().AnyAsync(predicate, cancellationToken: ct);

    public virtual async Task<bool> ExistsAsync(Guid id) =>
        await context.Set<T>().FindAsync(id) is not null;
}
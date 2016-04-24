using System;

namespace UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        //    IHeroRepository HeroRepository { get; }
        //    IPlayerRepository PlayerRepository { get; }
        //    IMatchRepository MatchRepository { get; }
        int Commit();
    }
}
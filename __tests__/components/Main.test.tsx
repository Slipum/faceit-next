import { render, screen, waitFor } from '@testing-library/react';
import { Main } from '@/components/Main';

describe('Main', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        cover_image: '/cover.jpg',
        country: 'ua',
        avatar: '/ava.jpg',
        player_id: 'pid',
        games: { cs2: { faceit_elo: 2000, skill_level: 8, region: 'eu', game_player_name: 'nick' }, csgo: { faceit_elo: 0, skill_level: 0, region: 'eu', game_player_name: 'nick' } },
        steam_id_64: '123',
      }),
    }) as any;
  });

  it('fetches user data on username change and updates state callbacks', async () => {
    const setGames = jest.fn();
    const setUserId = jest.fn();
    render(<Main username="s1mple" setGames={setGames} setUserId={setUserId} />);

    await waitFor(() => expect(screen.getByText(/Current ELO:/)).toBeInTheDocument());
    expect(setGames).toHaveBeenCalledWith(expect.objectContaining({ cs2: expect.any(Object) }));
    expect(setUserId).toHaveBeenCalledWith('pid');
  });

  it('does not fetch when username is empty', async () => {
    render(<Main username="" setUserId={jest.fn()} />);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles network error gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500, statusText: 'err' });
    const setUserId = jest.fn();
    render(<Main username="err" setUserId={setUserId} />);
    // Should render empty fragment when error, no crash
    await waitFor(() => {
      // No username visible
      expect(screen.queryByText('err')).not.toBeInTheDocument();
    });
  });
});



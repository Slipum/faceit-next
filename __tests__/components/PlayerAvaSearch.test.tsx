import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerAvaSearch from '@/components/PlayerAvaSearch';

describe('PlayerAvaSearch', () => {
  it('renders provided avatar', () => {
    render(<PlayerAvaSearch avatar="/avatar.png" nickname="nick" />);
    const img = screen.getByAltText('nick') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/avatar.png');
  });

  it('falls back to default image on error', async () => {
    render(<PlayerAvaSearch avatar="/broken.png" nickname="nick" />);
    const img = screen.getByAltText('nick') as HTMLImageElement;
    // trigger onError
    img.dispatchEvent(new Event('error'));

    // After error, fallback image should appear
    const fallback = await screen.findByAltText('avatar');
    expect(fallback).toBeInTheDocument();
  });

  it('renders fallback when avatar is empty', () => {
    render(<PlayerAvaSearch avatar="" nickname="nick" />);
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });
});



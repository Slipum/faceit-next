import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/Header';

const mockPush = jest.fn();

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/dist/client/components/navigation');
  return {
    ...actual,
    useRouter: () => ({ push: mockPush }),
  };
});

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockReset();
    // default fetch mock
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    }) as any;
  });

  it('navigates on Enter with non-empty value', async () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('Enter faceit username');
    await userEvent.type(input, 's1mple{enter}');
    expect(mockPush).toHaveBeenCalledWith('/profile?search=s1mple');
  });

  it('clears input and results on clear button click', async () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('Enter faceit username');
    await userEvent.type(input, 'device');

    const clear = screen.getByRole('button');
    await userEvent.click(clear);

    // After clearing, input should be empty
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('shows fetched suggestions when typing more than 2 chars', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [ { player_id: '1', nickname: 'navi', avatar: '/ava.png' } ] }),
    });

    render(<Header />);
    const input = screen.getByPlaceholderText('Enter faceit username');
    await userEvent.type(input, 'navi');

    await waitFor(() => expect(screen.getByText('navi')).toBeInTheDocument());
  });

  it('renders error message when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Server Error' });
    render(<Header />);
    const input = screen.getByPlaceholderText('Enter faceit username');
    await userEvent.type(input, 'abc');

    await screen.findByText(/Error:/);
  });
});



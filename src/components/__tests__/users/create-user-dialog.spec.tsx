import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUserDialog } from '@/components/users/create-user/create-user-dialog';
import '@testing-library/dom';

describe('Create user dialog', () => {
  it('should render a button if not clicked', () => {
    // Arrange
    const wrapper = render(<CreateUserDialog />);

    // Act & Assert
    expect(wrapper.getByText('Create User')).toBeDefined();
  });

  it('should display a modal when button is clicked', async () => {
    const wrapper = render(<CreateUserDialog />);

    await userEvent.click(wrapper.getByText('Create User'));

    expect(await wrapper.findByLabelText('Email')).toBeDefined();
    expect(await wrapper.findByLabelText('Username')).toBeDefined();
    expect(await wrapper.findByLabelText('Password')).toBeDefined();
  });
});

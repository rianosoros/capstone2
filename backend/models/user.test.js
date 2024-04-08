const User = require('./user');

describe('User Model', () => {
  // Test for the authenticate method
  describe('authenticate', () => {
    it('should authenticate a user with valid credentials', async () => {
      const user = await User.authenticate('valid_username', 'valid_password');
      expect(user).toBeDefined();
      expect(user.username).toEqual('valid_username');
    });

    it('should throw UnauthorizedError for invalid credentials', async () => {
      await expect(User.authenticate('invalid_username', 'invalid_password')).rejects.toThrowError('Invalid username/password');
    });
  });

  // Test for the register method
  describe('register', () => {
    it('should register a new user with valid data', async () => {
      const newUser = await User.register({
        username: 'new_user',
        password: 'password',
        email: 'new_user@example.com',
        isAdmin: false
      });
      expect(newUser).toBeDefined();
      expect(newUser.username).toEqual('new_user');
    });

    it('should throw BadRequestError for duplicate username', async () => {
      await expect(User.register({
        username: 'existing_user',
        password: 'password',
        email: 'existing_user@example.com',
        isAdmin: false
      })).rejects.toThrowError('Duplicate username');
    });
  });

  // Test for the findAll method
  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await User.findAll();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  // Test for the get method
  describe('get', () => {
    it('should return user data by username', async () => {
      const user = await User.get('existing_user');
      expect(user).toBeDefined();
      expect(user.username).toEqual('existing_user');
    });

    it('should throw NotFoundError for non-existent username', async () => {
      await expect(User.get('non_existent_user')).rejects.toThrowError('No user');
    });
  });

  // Test for the update method
  describe('update', () => {
    it('should update user data with valid data', async () => {
      const updatedUser = await User.update('existing_user', { email: 'updated_email@example.com' });
      expect(updatedUser).toBeDefined();
      expect(updatedUser.email).toEqual('updated_email@example.com');
    });

    it('should throw NotFoundError for non-existent username', async () => {
      await expect(User.update('non_existent_user', { email: 'updated_email@example.com' })).rejects.toThrowError('No user');
    });
  });

  // Test for the remove method
  describe('remove', () => {
    it('should remove a user by username', async () => {
      const removedUser = await User.remove('existing_user');
      expect(removedUser).toBeDefined();
      expect(removedUser.username).toEqual('existing_user');
    });

    it('should throw NotFoundError for non-existent username', async () => {
      await expect(User.remove('non_existent_user')).rejects.toThrowError('No user');
    });
  });
});

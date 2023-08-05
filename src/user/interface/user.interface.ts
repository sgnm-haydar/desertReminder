export interface UserInterface {
  getUser(email);
  getUsers();
  createUserFromJsonFile();
  punishmentProcessor(dto);
  getUserPunishment(userId);
  createUser(createUserDto);
}

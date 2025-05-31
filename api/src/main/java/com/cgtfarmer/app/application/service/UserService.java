package com.cgtfarmer.app.application.service;

import com.cgtfarmer.app.adapter.activity.exception.ResourceNotFoundException;
import com.cgtfarmer.app.application.model.User;
import com.cgtfarmer.app.application.port.in.CreateUserUseCase;
import com.cgtfarmer.app.application.port.in.DestroyUserUseCase;
import com.cgtfarmer.app.application.port.in.GetAllUsersUseCase;
import com.cgtfarmer.app.application.port.in.GetUserUseCase;
import com.cgtfarmer.app.application.port.in.UpdateUserUseCase;
import com.cgtfarmer.app.application.port.out.UserRepository;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.List;
import java.util.UUID;

@Singleton
public final class UserService implements CreateUserUseCase, UpdateUserUseCase,
    DestroyUserUseCase, GetUserUseCase, GetAllUsersUseCase {

  private final UserRepository userRepository;

  @Inject
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public User createUser(User user) {
    return this.userRepository.put(user);
  }

  @Override
  public User updateUser(User user) {
    return this.userRepository.put(user);
  }

  @Override
  public User getUser(UUID id) {
    return this.userRepository.get(id)
        .orElseThrow(() -> new ResourceNotFoundException(User.class, id));
  }

  @Override
  public List<User> getAllUsers() {
    return this.userRepository.getAll();
  }

  @Override
  public boolean destroyUser(UUID id) {
    return this.userRepository.destroy(id);
  }
}

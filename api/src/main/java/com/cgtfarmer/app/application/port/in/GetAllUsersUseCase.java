package com.cgtfarmer.app.application.port.in;

import com.cgtfarmer.app.application.model.User;
import java.util.List;

public interface GetAllUsersUseCase {

  public List<User> getAllUsers();
}

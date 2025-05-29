package com.cgtfarmer.app.application.port.in;

import com.cgtfarmer.app.application.model.User;
import java.util.UUID;

public interface GetUserUseCase {

  public User getUser(UUID id);
}

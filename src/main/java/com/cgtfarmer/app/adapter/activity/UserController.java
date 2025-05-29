package com.cgtfarmer.app.adapter.activity;

import com.cgtfarmer.app.adapter.activity.mapper.UserControllerMapper;
import com.cgtfarmer.app.application.model.User;
import com.cgtfarmer.app.application.port.in.CreateUserUseCase;
import com.cgtfarmer.app.application.port.in.DestroyUserUseCase;
import com.cgtfarmer.app.application.port.in.GetAllUsersUseCase;
import com.cgtfarmer.app.application.port.in.GetUserUseCase;
import com.cgtfarmer.app.application.port.in.UpdateUserUseCase;
import com.smithy.api.UserApi;
import com.smithy.model.CreateUserRequestContent;
import com.smithy.model.CreateUserResponseContent;
import com.smithy.model.DestroyUserResponseContent;
import com.smithy.model.GetUserResponseContent;
import com.smithy.model.ListUsersResponseContent;
import com.smithy.model.PutUserRequestContent;
import com.smithy.model.PutUserResponseContent;
import com.smithy.model.UserDto;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Controller("/users")
public class UserController implements UserApi {

  private final GetUserUseCase getUserUseCase;

  private final GetAllUsersUseCase getAllUsersUseCase;

  private final CreateUserUseCase createUserUseCase;

  private final UpdateUserUseCase updateUserUseCase;

  private final DestroyUserUseCase destroyUserUseCase;

  private final UserControllerMapper mapper;

  @Inject
  public UserController(
      GetUserUseCase getUserUseCase,
      GetAllUsersUseCase getAllUsersUseCase,
      CreateUserUseCase createUserUseCase,
      UpdateUserUseCase updateUserUseCase,
      DestroyUserUseCase destroyUserUseCase,
      UserControllerMapper mapper
  ) {
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.destroyUserUseCase = destroyUserUseCase;
    this.getUserUseCase = getUserUseCase;
    this.getAllUsersUseCase = getAllUsersUseCase;
    this.mapper = mapper;
  }

  @Get
  public ListUsersResponseContent listUsers() {
    List<User> processedUsers = this.getAllUsersUseCase.getAllUsers();

    List<UserDto> result = this.mapper.mapToDto(processedUsers);

    return new ListUsersResponseContent(result);
  }

  @Post
  public HttpResponse<@Valid CreateUserResponseContent> createUser(
      @Body @NotNull @Valid CreateUserRequestContent request
  ) {
    User user = this.mapper.mapToModel(request.getUser());

    User processedUser = this.createUserUseCase.createUser(user);

    UserDto result = this.mapper.mapToDto(processedUser);

    return HttpResponse.created(new CreateUserResponseContent(result));
  }

  @Get("/{userId}")
  public GetUserResponseContent getUser(
      @PathVariable("userId") @NotBlank String userId
  ) { // throws ResourceNotFoundException {
    UUID id = UUID.fromString(userId);

    User processedUser = this.getUserUseCase.getUser(id);

    // if (Objects.isNull(processedUser))
    // throw new ResourceNotFoundException(userId);

    UserDto result = this.mapper.mapToDto(processedUser);

    return new GetUserResponseContent(result);
  }

  @Put("/{userId}")
  public PutUserResponseContent putUser(
      @PathVariable("userId") @NotNull String id,
      @Body @NotNull @Valid PutUserRequestContent request
  ) {
    User user = this.mapper.mapToModel(request.getUser());

    user.setId(UUID.fromString(id));

    User processedUser = this.updateUserUseCase.updateUser(user);

    UserDto result = this.mapper.mapToDto(processedUser);

    return new PutUserResponseContent(result);
  }

  @Delete("/{userId}")
  public DestroyUserResponseContent destroyUser(
      @PathVariable("userId") @NotNull String userId
  ) {
    boolean result =
        this.destroyUserUseCase.destroyUser(UUID.fromString(userId));

    return new DestroyUserResponseContent(result);
  }
}

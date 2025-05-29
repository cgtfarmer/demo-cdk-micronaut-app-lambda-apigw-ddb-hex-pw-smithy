package com.cgtfarmer.app.adapter.activity.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public final record GetAllUsersResponse(List<UserDto> users) {
}

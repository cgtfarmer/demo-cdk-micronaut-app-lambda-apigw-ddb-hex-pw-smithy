package com.cgtfarmer.app.adapter.activity.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.UUID;

@Serdeable
public final record UpdateUserRequest(UUID id, UserDto user) {
}

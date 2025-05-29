package com.cgtfarmer.app.adapter.activity.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.UUID;

@Serdeable
public final record UserDto(
    UUID id,
    String firstName,
    String lastName,
    int age,
    float weight,
    boolean smoker
) {
}

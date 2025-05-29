package com.cgtfarmer.app.adapter.activity.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public final record DestroyUserResponse(boolean success) {
}

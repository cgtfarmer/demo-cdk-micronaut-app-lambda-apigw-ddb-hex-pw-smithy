package com.cgtfarmer.app.adapter.activity.exception;

import java.util.UUID;

public class ResourceNotFoundException extends Exception {

  public ResourceNotFoundException(UUID id) {
    super("Resource Not Found: " + id);
  }
}

package com.cgtfarmer.app;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.Collections;
import java.util.Map;

@Controller
public class RootController {

  @Get("/health")
  public Map<String, Object> health() {
    return Collections.singletonMap("message", "Healthy");
  }
}

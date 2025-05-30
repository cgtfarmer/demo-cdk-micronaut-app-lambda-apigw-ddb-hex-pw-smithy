package com.cgtfarmer.app.adapter.activity.exception;

public final class UnsupportedRouteException extends Exception {

  public UnsupportedRouteException(String route) {
    super("Unsupported route: " + route);
  }
}

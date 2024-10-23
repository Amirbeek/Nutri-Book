package org.example.nutribookbe.exception;

import java.io.Serial;

public class TokenNotFoundException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = 1L;

    public TokenNotFoundException(String message) {
        super(message);
    }
}

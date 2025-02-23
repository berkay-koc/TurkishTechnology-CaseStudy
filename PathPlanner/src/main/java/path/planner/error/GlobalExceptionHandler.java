package path.planner.error;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import path.planner.shared.GenericResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public GenericResponse handleDatabaseError(DataIntegrityViolationException e) {
	    return new GenericResponse("An unexpected error occurred.");
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public GenericResponse handleOtherExceptions(Exception e) {
	    return new GenericResponse("An unexpected error occurred: " + e.getMessage());
	}

}
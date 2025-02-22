package path.planner.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.fasterxml.jackson.annotation.JsonInclude.Include;

@RestController
@CrossOrigin
public class ErrorHandler implements ErrorController {

	@Autowired
	private ErrorAttributes errorAttributes;

	@RequestMapping("/error")
	ApiError handleError(WebRequest webRequest) {
		Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest,
				ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE,
						ErrorAttributeOptions.Include.BINDING_ERRORS, ErrorAttributeOptions.Include.EXCEPTION,
						ErrorAttributeOptions.Include.STACK_TRACE, ErrorAttributeOptions.Include.STATUS,
						ErrorAttributeOptions.Include.ERROR));
		String message = (String) attributes.get("message");
		String path = (String) attributes.get("path");
		int status = (Integer) attributes.get("status");
		ApiError error = new ApiError(status, message, path);
		if (attributes.containsKey("errors")) {
			Object errorsObject = attributes.get("errors");
			if (errorsObject instanceof List<?>) {
				List<?> errorsList = (List<?>) errorsObject;
				Map<String, String> validationErrors = new HashMap<>();
				for (Object errorObject : errorsList) {
					if (errorObject instanceof FieldError) {
						FieldError fieldError = (FieldError) errorObject;
						validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
					}
				}

				error.setValidationErrors(validationErrors);
			}
		}
		return error;
	}
}
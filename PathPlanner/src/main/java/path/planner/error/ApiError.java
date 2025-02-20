package path.planner.error;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
	private int status;
	
	private String message;
	
	private String path;
	
	private Timestamp timestamp = new Timestamp(new Date().getTime());
	
	private Map<String, String> validationErrors;
	
	public ApiError(int status, String message, String path) {
		this.status = status;
		this.path = path;
		this.message = message;
	}
}
package path.planner.path;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathRequest {
	//@NotNull(message="From location cannot be empty.")
	private String fromLocation;
	//@NotNull(message="To location cannot be empty.")
	private String toLocation;
}
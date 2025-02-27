package path.planner.path;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathRequest {
	@NotNull(message="From location cannot be empty.")
	@Schema(name = "From Location", example = "SAW")
	private String fromLocation;
	@NotNull(message="To location cannot be empty.")
	@Schema(name = "To Location", example = "ADB")
	private String toLocation;
}
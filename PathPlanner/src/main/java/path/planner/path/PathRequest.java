package path.planner.path;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathRequest {
	@NotNull(message="Nereden bilgisi boş olamaz.")
	private String fromLocation;
	@NotNull(message="Nereye bilgisi boş olamaz.")
	private String toLocation;
}
package path.planner.path;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import path.planner.transportations.Transportation;

@Data
@NoArgsConstructor
public class Path {
	private List<List<Transportation>> transportationList = new ArrayList<List<Transportation>>();
	private Integer optionSize;
	
}

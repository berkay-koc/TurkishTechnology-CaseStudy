package path.planner.path;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import path.planner.transportations.Transportation;

@RestController
@Validated
@RequestMapping("/path")
public class PathController {

	@Autowired
	private PathService pathService;

	@GetMapping("/find")
	@ResponseStatus(HttpStatus.FOUND)
	public Path findAllPaths(@RequestBody PathRequest pathRequest) {
		return pathService.findAllPaths(pathRequest, new ArrayList<String>(), new ArrayList<Transportation>(),
				new Path());

	}
}

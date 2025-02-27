package path.planner.path;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import path.planner.transportations.Transportation;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@RequestMapping("/path")
public class PathController {

	@Autowired
	private PathService pathService;

	@PostMapping("/find")
	@ResponseStatus(HttpStatus.OK)
	public Path findAllPaths(@RequestBody PathRequest pathRequest) {
		Path allPaths =  pathService.findAllPaths(pathRequest, new ArrayList<String>(), new ArrayList<Transportation>(),
				new Path());
		pathService.formatLocationNames(allPaths);
		return allPaths;

	}
}

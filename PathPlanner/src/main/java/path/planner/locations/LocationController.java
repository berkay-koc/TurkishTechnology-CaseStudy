package path.planner.locations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import path.planner.shared.GenericResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@RequestMapping("/location")
public class LocationController {

	@Autowired
	private LocationService locationService;

	@PostMapping("/create")
	@Operation(summary = "Create a new location.", description = "Creates a new location.")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createLocation(@Valid @RequestBody Location location) {
	    return locationService.save(location);
	}

	@DeleteMapping("/delete/{locationId}")
	@Operation(summary = "Delete a location.", description = "Deletes the location whose locationId is provided as a URL parameter.")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse deleteLocation(@PathVariable(name = "locationId") String locationId) {
	    return locationService.deleteLocation(locationId);
	}

	@PostMapping("/update/{locationCode}")
	@Operation(summary = "Update a location.", description = "Updates the location with the provided body values, whose locationCode is given as a URL parameter.")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse updateLocation(@PathVariable(name = "locationCode") String locationId, @Valid @RequestBody Location location) {
	    return locationService.save(locationId, location);
	}

	@GetMapping("/get/{locationId}")
	@Operation(summary = "Fetch a location.", description = "Fetches a location whose locationId is provided as a URL parameter.")
	@ResponseStatus(HttpStatus.FOUND)
	public Location getLocation(@PathVariable(name = "locationId") String locationId) {
	    return locationService.getLocation(locationId);
	}

	@GetMapping("/get")
	@Operation(summary = "Fetch all locations.", description = "Fetches all available locations.")
	@ResponseStatus(HttpStatus.OK)
	public List<Location> getAllLocations() {
	    return locationService.getAllLocations();
	}

}

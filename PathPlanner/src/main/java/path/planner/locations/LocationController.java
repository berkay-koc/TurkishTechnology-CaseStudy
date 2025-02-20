package path.planner.locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import path.planner.shared.GenericResponse;

@RestController
@Validated
@RequestMapping("/location")
public class LocationController {

	@Autowired
	LocationService locationService;

	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createLocation(@Valid @RequestBody Location location) {
		return locationService.save(location);
	}

	@DeleteMapping("/delete/{locationId}")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse deleteLocation(@PathVariable(name = "locationId") String locationId) {
		return locationService.deleteLocation(locationId);
	}

	@PostMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse updateLocation(@Valid @RequestBody Location location) {
		locationService.save(location);
		return new GenericResponse("Lokasyon güncellendi.");
	}

	@GetMapping("/get/{locationId}")
	@ResponseStatus(HttpStatus.FOUND)
	public Location getLocation(@PathVariable(name = "locationId") String locationId) {
		return locationService.getLocation(locationId);
	}
}

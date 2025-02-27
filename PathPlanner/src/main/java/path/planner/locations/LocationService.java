package path.planner.locations;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import path.planner.error.AlreadyExistsException;
import path.planner.error.NotFoundException;
import path.planner.shared.GenericResponse;

@Service
public class LocationService {

	@Autowired
	private LocationRepository locationRepository;

	public GenericResponse save(Location location) {
		Location controlLocation = getLocationById(location.getLocationCode());
		if (controlLocation == null) {
			locationRepository.save(location);
			return new GenericResponse("Location added.");
		} else {
			return new GenericResponse("A location with this code already exists.");
		}
	}

	public GenericResponse save(String locationId, Location location) {
		Location controlLocation = getLocationById(locationId);
		if(!controlLocation.getLocationCode().equals(location.getLocationCode())) {
			throw new AlreadyExistsException("Location code cannot be different.");
		}
		if (controlLocation == null) {
			return new GenericResponse("Location could not be updated.");
		} else {
			locationRepository.save(location);
			return new GenericResponse("Location updated.");
		}

	}

	public GenericResponse deleteLocation(String locationId) {
		Location location = getLocationById(locationId);
		if (location == null) {
			return new GenericResponse("Location not found.");
		} else {
			locationRepository.delete(location);
			return new GenericResponse("Location deleted.");
		}
	}

	public Location getLocation(String locationId) {
		Location location = getLocationById(locationId);
		if (location == null) {
			throw new NotFoundException("Location not found.");
		} else {
			return location;
		}
	}

	private Location getLocationById(String locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		return location;
	}

	public List<Location> getAllLocations() {
		return locationRepository.findAll();
	}

	public Map<String, String> getAllLocationsAsMap() {
		List<Location> locationList = getAllLocations();
		Map<String, String> locationMap = new HashMap<String, String>();
		for (Location location : locationList) {
			locationMap.put(location.getLocationCode(), location.getName());
		}
		return locationMap;
	}

}

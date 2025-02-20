package path.planner.locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import path.planner.error.NotFoundException;
import path.planner.shared.GenericResponse;

@Service
public class LocationService {

	@Autowired
	LocationRepository locationRepository;

	public GenericResponse save(Location location) {
		Location controlLocation = getLocationById(location.getLocationCode());
		if(controlLocation == null) {
			locationRepository.save(location);
			return new GenericResponse("Lokasyon eklendi.");
		} else {
			return new GenericResponse("Bu kodlu lokasyon zaten var.");
		}
		
	}

	public GenericResponse deleteLocation(String locationId) {
		Location location = getLocationById(locationId);
		if(location == null) {
			return new GenericResponse("Lokasyon bulunamadı.");
		} else {
			locationRepository.delete(location);
			return new GenericResponse("Lokasyon silindi.");
		}
	}
	
	public Location getLocation(String locationId) {
		Location location = getLocationById(locationId);
		if(location == null) {
			throw new NotFoundException("Lokasyon bulunamadı.");
		} else {
			return location;
		}
	}
	
	private Location getLocationById(String locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		return location;
	}

}

package path.planner.transportations;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import path.planner.error.AlreadyExistsException;
import path.planner.error.NotFoundException;
import path.planner.locations.LocationService;
import path.planner.shared.GenericResponse;

@Service
public class TransportationService {

	@Autowired
	private TransportationRepository transportationRepository;

	@Autowired
	private LocationService locationService;

	public GenericResponse save(Transportation transportation) {
		if (transportation.getFromLocation().equals(transportation.getToLocation())) {
			throw new AlreadyExistsException("The two locations cannot be the same.");
		}
		Transportation controlTransportation = findTransportationByFields(transportation.getFromLocation(),
				transportation.getToLocation(), transportation.getTransportationType()).get();
		if (!controlTransportation.equals(transportation)) {
			transportationRepository.save(transportation);
			return new GenericResponse("New route added.");
		} else {
			throw new AlreadyExistsException("This route already exists.");
		}
	}

	public GenericResponse deleteTransportation(String transportationId) {
		Transportation controlTransportation = getTransportationById(Long.valueOf(transportationId));
		if (Long.valueOf(controlTransportation.getTransportationId()) != 0) {
			transportationRepository.delete(controlTransportation);
			return new GenericResponse("Route deleted.");
		} else {
			return new GenericResponse("Route not found.");
		}
	}

	public GenericResponse updateTransportation(String transportationId, Transportation transportation) {
		Transportation inDb = getTransportationById(Long.valueOf(transportationId));
		if (Long.valueOf(inDb.getTransportationId()) != 0) {
			transportation.setTransportationId(inDb.getTransportationId());
			transportation.setFromLocation(transportation.getFromLocation() != null ? transportation.getFromLocation()
					: inDb.getFromLocation());
			transportation.setToLocation(
					transportation.getToLocation() != null ? transportation.getToLocation() : inDb.getToLocation());
			transportation.setTransportationType(
					transportation.getTransportationType() != null ? transportation.getTransportationType()
							: inDb.getTransportationType());
			transportationRepository.save(transportation);
			return new GenericResponse("Route updated.");
		} else {
			return new GenericResponse("Route not found.");
		}
	}

	private Transportation getTransportationById(long transportationId) {
		Transportation transportation = transportationRepository.findById(transportationId)
				.orElse(new Transportation());
		return transportation;
	}

	private Optional<Transportation> findTransportationByFields(String fromLocation, String toLocation,
			TransportationEnum transportationEnum) {
		return Optional.ofNullable(transportationRepository
				.findByFromLocationAndToLocationAndTransportationType(fromLocation, toLocation, transportationEnum)
				.orElse(new Transportation()));
	}

	public List<Transportation> fetchAllTransportations() {
		List<Transportation> transportations = transportationRepository.findAll();
		Map<String, String> locationsMap = locationService.getAllLocationsAsMap();
		for (Transportation transportation : transportations) {
			transportation.setFromLocation(
					transportation.getFromLocation() + " - "+ locationsMap.get(transportation.getFromLocation()));
			transportation
					.setToLocation(transportation.getToLocation() + " - " + locationsMap.get(transportation.getToLocation()));
		}
		return transportations;
	}

	public List<Transportation> fetchTransportationsByFromLocation(String fromLocation) {
		return transportationRepository.findAllByFromLocation(fromLocation);
	}

	public List<Transportation> fetchTransportationsByToLocation(String toLocation) {
		return transportationRepository.findAllByToLocation(toLocation);
	}

	public Transportation fetchTransportation(String transportationId) {
		Transportation transportation = getTransportationById(Long.valueOf(transportationId));
		if (transportation.getTransportationId() == 0) {
			throw new NotFoundException("Transportation not found.");
		}
		return transportation;
	}

	public List<Transportation> fetchByFromLocationAndToLocationNotIn(String fromLocation, List<String> toLocations) {
		return transportationRepository.findByFromLocationAndToLocationNotIn(fromLocation, toLocations);
	}

}

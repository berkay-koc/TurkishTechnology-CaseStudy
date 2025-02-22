package path.planner.transportations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import path.planner.error.NotFoundException;
import path.planner.shared.GenericResponse;

@Service
public class TransportationService {

	@Autowired
	private TransportationRepository transportationRepository;

	public GenericResponse save(Transportation transportation) {
		if (transportation.getFromLocation().equals(transportation.getToLocation())) {
			return new GenericResponse("İki lokasyon aynı olamaz.");
		}
		Transportation controlTransportation = findTransportationByFields(transportation.getFromLocation(),
				transportation.getToLocation(), transportation.getTransportationType()).get();
		if (!controlTransportation.equals(transportation)) {
			transportationRepository.save(transportation);
			return new GenericResponse("Yeni rota eklendi.");
		} else {
			return new GenericResponse("Bu rota zaten var.");
		}
	}

	public GenericResponse deleteTransportation(String transportationId) {
		Transportation controlTransportation = getTransportationById(Long.valueOf(transportationId));
		if (Long.valueOf(controlTransportation.getTransportationId()) != 0) {
			transportationRepository.delete(controlTransportation);
			return new GenericResponse("Rota silindi.");
		} else {
			return new GenericResponse("Rota bulunamadı.");
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
			return new GenericResponse("Rota güncellendi.");
		} else {
			return new GenericResponse("Rota bulunamadı.");
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
		return transportationRepository.findAll();
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
			throw new NotFoundException("Transportation bulunamadı.");
		}
		return transportation;
	}

	public List<Transportation> fetchByFromLocationAndToLocationNotIn(String fromLocation, List<String> toLocations) {
		return transportationRepository.findByFromLocationAndToLocationNotIn(fromLocation, toLocations);
	}

}

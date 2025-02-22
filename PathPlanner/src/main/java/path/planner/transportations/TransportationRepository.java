package path.planner.transportations;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportationRepository extends JpaRepository<Transportation, Long> {
	Optional<Transportation> findByFromLocationAndToLocationAndTransportationType(String fromLocation,
			String toLocation, TransportationEnum transportationType);
	
	List<Transportation> findAllByFromLocationAndToLocationAndTransportationType(String fromLocation,
			String toLocation, TransportationEnum transportationType);
	
	List<Transportation> findAllByFromLocation(String fromLocation);
	
	List<Transportation> findAllByToLocation(String toLocation);
	
	List<Transportation> findByFromLocationAndToLocationNotIn(String fromLocation, List<String> toLocations);
}

package path.planner.path;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import path.planner.transportations.Transportation;
import path.planner.transportations.TransportationEnum;
import path.planner.transportations.TransportationService;

@Service
public class PathService {

	@Autowired
	private TransportationService transportationService;

	public Path findAllPaths(PathRequest pathRequest, List<String> lastLocations,
			List<Transportation> transportationList, Path path) {
		String fromLocation = pathRequest.getFromLocation();
		String toLocation = pathRequest.getToLocation();
		List<Transportation> transportations = new ArrayList<Transportation>();

		if (transportationList.size() > 2) {
			return path;
		}

		if (CollectionUtils.isEmpty(lastLocations)) {
			transportations = transportationService.fetchTransportationsByFromLocation(fromLocation);

		} else {
			transportations = transportationService.fetchByFromLocationAndToLocationNotIn(fromLocation, lastLocations);

		}

		lastLocations.add(fromLocation);

		for (Transportation transportation : transportations) {
			transportationList.add(transportation);
			if (transportation.getToLocation().equals(toLocation)) {
				if (validateTransportations(transportationList)) {
					path.getTransportationList().add(new ArrayList<>(transportationList));
				}
			} else {
				findAllPaths(new PathRequest(transportation.getToLocation(), toLocation), lastLocations,
						transportationList, path);
			}
			transportationList.remove(transportationList.size() - 1);
			if (!CollectionUtils.isEmpty(lastLocations)) {
				lastLocations.remove(lastLocations.size() - 1);
			}

		}

		path.setOptionSize(path.getTransportationList().size());
		return path;
	}

	private boolean validateTransportations(List<Transportation> transportationList) {
		long beforeFlightTransfers = transportationList.stream()
				.takeWhile(transportation -> transportation.getTransportationType() != TransportationEnum.FLIGHT)
				.count();

		long afterFlightTransfers = transportationList.stream()
				.dropWhile(transportation -> transportation.getTransportationType() != TransportationEnum.FLIGHT)
				.skip(1).count();
		long flightCount = transportationList.stream()
				.filter(transportation -> transportation.getTransportationType() == TransportationEnum.FLIGHT).count();

		boolean beforeFlightControl = beforeFlightTransfers <= 1;
		boolean afterFlightControl = afterFlightTransfers <= 1;

		if (transportationList.size() > 3) {
			return false;
		} else if (flightCount != 1) {
			return false;
		}

		return beforeFlightControl && afterFlightControl;
	}

}

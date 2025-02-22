package path.planner.transportations;

import java.util.List;

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

import jakarta.validation.Valid;
import path.planner.shared.GenericResponse;

@RestController
@Validated
@RequestMapping("/transportation")
public class TransportationController {

	@Autowired
	private TransportationService transportationService;

	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createTransportation(@Valid @RequestBody Transportation transportation) {
		return transportationService.save(transportation);
	}

	@DeleteMapping("/delete/{transportationId}")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse deleteTransportation(@PathVariable(name = "transportationId") String transportationId) {
		return transportationService.deleteTransportation(transportationId);
	}

	@PostMapping("/update/{transportationId}")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse updateTransportation(@PathVariable(name = "transportationId") String transportationId,
			@Valid @RequestBody Transportation transportation) {
		return transportationService.updateTransportation(transportationId, transportation);
	}
	
	@GetMapping("/fetch")
	@ResponseStatus(HttpStatus.OK)
	public List<Transportation> fetchAllTransportations() {
		return transportationService.fetchAllTransportations();
	}
	
	@GetMapping("/fetch/{transportationId}")
	@ResponseStatus(HttpStatus.OK)
	public Transportation fetchTransportation(@PathVariable(name = "transportationId") String transportationId) {
		return transportationService.fetchTransportation(transportationId);
	}

}

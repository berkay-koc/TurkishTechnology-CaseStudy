package path.planner.transportations;

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
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import path.planner.shared.GenericResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@RequestMapping("/transportation")
public class TransportationController {

	@Autowired
	private TransportationService transportationService;

	@PostMapping("/create")
	@Operation(summary = "Create a new Transportation.", description = "Creates a new Transportation.")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createTransportation(@Valid @RequestBody Transportation transportation) {
		return transportationService.save(transportation);
	}

	@DeleteMapping("/delete/{transportationId}")
	@Operation(summary = "Delete a transportation.", description = "Deletes the transportation whose transportationId is given as a URL parameter.")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse deleteTransportation(@PathVariable(name = "transportationId") String transportationId) {
		return transportationService.deleteTransportation(transportationId);
	}

	@PostMapping("/update/{transportationId}")
	@Operation(summary = "Update a transportation.", description = "Updates the transportation with the body values, whose transportationId is given as URL paramter.")
	@ResponseStatus(HttpStatus.OK)
	public GenericResponse updateTransportation(@PathVariable(name = "transportationId") String transportationId,
			@Valid @RequestBody Transportation transportation) {
		return transportationService.updateTransportation(transportationId, transportation);
	}
	
	@GetMapping("/fetch")
	@ResponseStatus(HttpStatus.OK)
	@Operation(summary = "Fetch all transportations.", description = "Fetches all available transportations.")
	public List<Transportation> fetchAllTransportations() {
		return transportationService.fetchAllTransportations();
	}
	
	@GetMapping("/fetch/{transportationId}")
	@Operation(summary = "Fetches a transportation.", description = "Fetches a transportation whose transportationId is given as URL parameter.")
	@ResponseStatus(HttpStatus.OK)
	public Transportation fetchTransportation(@PathVariable(name = "transportationId") String transportationId) {
		return transportationService.fetchTransportation(transportationId);
	}

}

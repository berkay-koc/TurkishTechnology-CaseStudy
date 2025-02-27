package path.planner.locations;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Locations")
@Getter
@Setter
@NoArgsConstructor
public class Location implements Serializable{
	
	private static final long serialVersionUID = 5388524142292892126L;
	
	@Size(min = 1, max = 255, message = "Location name must be between 1 and 255 characters.")
	@Column(name = "name", nullable = false)
	@NotNull(message = "Location name cannot be empty.")
	@Schema(name = "Location Name", example = "Sabiha Gökçen Airport")
	private String name;

	@Size(min = 1, max = 255, message = "Country name must be between 1 and 255 characters.")
	@Column(name = "country", nullable = false)
	@NotNull(message = "Country name cannot be empty.")
	@Schema(name = "Location's Country", example = "Turkey")
	private String country;

	@Size(min = 1, max = 255, message = "City name must be between 1 and 255 characters.")
	@Column(name = "city", nullable = false)
	@NotNull(message = "City name cannot be empty.")
	@Schema(name = "Location's City", example = "Istanbul")
	private String city;

	@Column(name = "location_code", nullable = false)
	@Id
	@NotNull(message = "Location code cannot be empty.")
	@Schema(name = "Location Code", example = "SAW")
	@Size(min = 1, max = 255, message = "Location code must be between 1 and 255 characters.")
	private String locationCode;


}
